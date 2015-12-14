const chai =  require('chai');

describe('the reverse', () => {
  var myFilter;
  beforeEach(angular.mock.module('irFilters'));
  beforeEach(angular.mock.inject($filter => {
    myFilter = $filter('reverse');
  }))

  it('should not be null', () => {
    chai.expect(myFilter).not.to.be.null;
  });

  it('should reverse a string', () => {
    myFilter('abc').should.equal('cba');
  });
});
