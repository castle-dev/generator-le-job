/// <reference path="../../../typings/modules/chai/index.d.ts" />
import chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let sinon = require('sinon');
let sinonChai = require('sinon-chai');
let expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('<%= pascalCaseJobClassName %>', () => {
  let <%= pascalCaseJobClassName %> = require('../../../app/jobs/<%= paramCaseJobClassName %>.js');

  beforeEach(() => {

  });

  it('should exist', () => {
    expect(<%= pascalCaseJobClassName %>).to.be.ok;
  });

  it('should have a run method', () => {
    let <%= camelCaseJobClassName %> = new <%= pascalCaseJobClassName %>();
    expect(<%= camelCaseJobClassName %>.run).to.be.a('function');
  });
});
