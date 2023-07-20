# cai2json

## Installation

Install globally:

```sh
npm install -g cai2json
```

## Usage

```sh
Usage: cai2json [options] <fileIn>

Tool for converting Zelda TotK CombinedActorInfo format to json

Arguments:
  fileIn               Input cai/save

Options:
  -o, --out [fileOut]  Output filename
  -i, --index [index]  AutoBuild index if using progress.sav
  -h, --help           display help for command

```

```sh
Usage: json2cai [options] <fileIn>

Tool for converting Zelda TotK CombinedActorInfo Json format to cai

Arguments:
  fileIn               Input json

Options:
  -o, --out <fileOut>  Output filename
  -h, --help           display help for command
```

## Examples

```sh
cai2json autobuild.cai
cai2json autobuild.cai -o autobuild.json
cai2json progress.sav -i 1 -o autobuild-1.json

json2cai autobuild.json -o autobuild.cai
```
