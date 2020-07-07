function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useRef, useMemo } from 'react';
import { useForm as useRcForm } from 'rc-field-form';
import scrollIntoView from 'scroll-into-view-if-needed';
import { toArray, getFieldId } from '../util';

function toNamePathStr(name) {
  var namePath = toArray(name);
  return namePath.join('_');
}

export default function useForm(form) {
  var _useRcForm = useRcForm(),
      _useRcForm2 = _slicedToArray(_useRcForm, 1),
      rcForm = _useRcForm2[0];

  var itemsRef = useRef({});
  var wrapForm = useMemo(function () {
    return form || _extends(_extends({}, rcForm), {
      __INTERNAL__: {
        itemRef: function itemRef(name) {
          return function (node) {
            var namePathStr = toNamePathStr(name);

            if (node) {
              itemsRef.current[namePathStr] = node;
            } else {
              delete itemsRef.current[namePathStr];
            }
          };
        }
      },
      scrollToField: function scrollToField(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var namePath = toArray(name);
        var fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name);
        var node = fieldId ? document.getElementById(fieldId) : null;

        if (node) {
          scrollIntoView(node, _extends({
            scrollMode: 'if-needed',
            block: 'nearest'
          }, options));
        }
      },
      getFieldInstance: function getFieldInstance(name) {
        var namePathStr = toNamePathStr(name);
        return itemsRef.current[namePathStr];
      }
    });
  }, [form, rcForm]);
  return [wrapForm];
}