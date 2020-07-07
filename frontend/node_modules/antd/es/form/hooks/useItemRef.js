function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import * as React from 'react';
import { composeRef } from "rc-util/es/ref";
import { FormContext } from '../context';
export default function useItemRef() {
  var _React$useContext = React.useContext(FormContext),
      itemRef = _React$useContext.itemRef;

  var cacheRef = React.useRef({});

  function getRef(name, children) {
    var childrenRef = children && _typeof(children) === 'object' && children.ref;
    var nameStr = name.join('_');

    if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
      cacheRef.current.name = nameStr;
      cacheRef.current.originRef = childrenRef;
      cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
    }

    return cacheRef.current.ref;
  }

  return getRef;
}