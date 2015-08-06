#!/usr/bin/env node
/**
 * add-package-owners <https://github.com/tunnckoCore/add-package-owners>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var got = require('got');
var cmd = require('spawn-commands');
var link = process.argv.slice(2)[0];
var url = link || 'https://rawgit.com/jstransformers/nuke/master/owners.json';

got.get(url, function(err, res) {
  var owners = JSON.parse(res).owners;
  var cmds = [];

  owners.forEach(function(name) {
    cmds.push({cmd: 'npm', args: ['owner', 'add', name]});
  });
  cmd(cmds, function(err) {
    console.log(err ? err : 'complete');
  });
});

