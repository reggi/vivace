/**
 * Created by jimit on 12/15/15.
 */

const PHONEREGEX = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
const EMAILREGEX = /^.+@.+\..+$/;


  module.exports = () => {
    return {
      PHONEREGEX,
      EMAILREGEX
    };
  };