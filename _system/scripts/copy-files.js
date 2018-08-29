const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

async function readFileDependencyVersion(entry) {
  const depPath = entry.substring("file:../".length);
  const packageJson = JSON.parse(await fse.readFile(path.resolve(__dirname, "../../", depPath, './package.json'), 'utf8'));
  return "^" + packageJson.version;
}

async function fixDependencies(dependencies) {
  const keys = Object.keys(dependencies);
  const fixed = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const version = dependencies[name];
    const fixedVersion = version.startsWith("file:")
      ? await readFileDependencyVersion(version)
      : version;
    fixed[name] = fixedVersion;
  }
  return fixed;
}

async function copyFile(file) {
  const distPath = path.resolve(process.env.INIT_CWD, './dist/', file);
  const srcPath = path.resolve(process.env.INIT_CWD, file);
  await fse.copy(srcPath, distPath);
  console.log(`Copied ${file} to ${distPath}`);
}

function typescriptCopy(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(process.env.INIT_CWD, './package.json'), 'utf8');
  const packageJson = JSON.parse(packageData);

  delete packageJson.jest;
  delete packageJson.scripts;
  delete packageJson.devDependencies;
  packageJson.main = './index.js';
  packageJson.module = './es/index.js';
  packageJson.private = false;
  packageJson.dependencies = packageJson.dependencies && await fixDependencies(packageJson.dependencies);
  packageJson.peerDependencies = packageJson.peerDependencies && await fixDependencies(packageJson.peerDependencies);

  const distPath = path.resolve(process.env.INIT_CWD, './dist/package.json');
  await fse.writeFile(distPath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log(`Created package.json in ${distPath}`);

  return packageJson;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData) {
  const license = `/** @license ${packageData.name} v${packageData.version}
 *
 * This source code is licensed under the ${packageData.license} license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    [
      './dist/index.js',
      './dist/es/index.js',
    ].map(file => prepend(path.resolve(process.env.INIT_CWD, file), license)),
  );
}

async function run() {
  await Promise.all(
    ['./README.md', './CHANGELOG.md', './LICENSE'].map(file => copyFile(file)),
  );
  const packageData = await createPackageFile();
  await addLicense(packageData);

  // TypeScript - We don't have any typescript definitions yet, but if someone wants to add them, this will make our life easier.
  const from = path.resolve(__dirname, '../src');
  await Promise.all([
    typescriptCopy(from, path.resolve(__dirname, '../dist')),
    typescriptCopy(from, path.resolve(__dirname, '../dist/es')),
  ]);
}

run();
