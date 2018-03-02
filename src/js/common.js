const deepIntergrity = function (obj, evi) {
  var str = obj.label.split(':')[1]
  var [arr, flag] = SplitMode(str)
  var len = arr.length
  var empty = []
  if (flag === 1) { // &
    for (let i = 0; i < len; i++) {
      if (arr[i].indexOf('s') === -1) {
        if (AliveInObj(evi, 'dict', arr[i]) === -1) {
          empty.push(arr[i])
        }
      } else {
        let pos = AliveInObj(obj.children, 'label', arr[i], true)
        let s = obj.children[pos]
        let part = deepIntergrity(s, evi)
        empty = empty.concat(part)
      }
    }
  } else {
    let j = 0
    for (let i = 0; i < len; i++) {
      if (arr[i].indexOf('s') === -1) {
        if (AliveInObj(evi, 'dict', arr[i]) !== -1) {
          return []
        } else {
          j++
        }
      } else {
        let pos = AliveInObj(obj.children, 'label', arr[i], true)
        let s = obj.children[pos]
        let part = deepIntergrity(s, evi)
        empty = empty.concat(part)
      }
    }
    if (j === len) {
      empty.push(arr.join('or'))
    }
  }
  return empty
}

function SplitMode (str) {
  let mode = []
  let flag = 0
  let f0 = str.indexOf('&')
  let f1 = str.indexOf('|')
  if (f0 !== -1) {
    mode = str.split('&')
    flag = 1
  } else if (f1 !== -1) {
    mode = str.split('|')
    flag = -1
  } else {
    mode.push(str)
  }
  return [mode, flag]
}

function AliveInObj (array, key, val, part = false) {
  for (let i in array) {
    if (part) {
      if (array[i][key].indexOf(val + ':') !== -1) {
        return i
      }
    } else {
      if (array[i][key] === val) {
        return i
      }
    }
  }
  return -1
}
export default {deepIntergrity, AliveInObj}
