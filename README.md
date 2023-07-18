# cai2json

## Installation

Install globally:

```sh
npm install -g cai2json
```

## Usage

Convert cai to json file

```sh
cai2json filein.cai fileout.json
```

also supports reading save files, by index 1-30
```sh
cai2json progress.sav fileout-1.json 1
cai2json progress.sav fileout-13.json 13
cai2json progress.sav fileout-30.json 30
```

Convert json to cai file

```sh
json2cai filein.json fileout.cai
```

