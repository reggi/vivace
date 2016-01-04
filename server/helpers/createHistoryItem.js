import CommentModel from '../models/CommentModel';
import interpolate from './template';

const TYPES = {
  CREATE: 'created',
  UPDATE: 'updated',
  LIST: 'listed',
  DELIST: 'delisted'
};

const FORMATS = {
  [TYPES.CREATE]: 'added candidate to the system',
  [TYPES.UPDATE]: 'updated fields: {fields}',
  [TYPES.LIST]: 'moved candidate to active list',
  [TYPES.DELIST]: 'removed candidate from active list'
};

let createItem = function(candidateId, req, message, messageArgs={}) {
  message = interpolate(FORMATS[message] || message, messageArgs);
  return CommentModel.create({
    candidate_id: candidateId,
    type: 'server',
    body: message,
    author: (req.user.email || 'Unknown').split('@')[0]
  });
};

createItem.TYPES = TYPES;

export default createItem;
