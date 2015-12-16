module.exports = function(CandidateModel) {
  this.users = [];
  CandidateModel.query((cands) => {
    this.users = cands;
  });

};
