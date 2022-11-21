const getAllSubsets = (theArray) => {
  const result = theArray.reduce((subsets, value) => {
    console.log('subsets', subsets);
    console.log('value', value);
    console.log('========================')
    return subsets.concat(
      subsets.map(set => {
        console.log('set', set);
        return [value,...set]
      })
    )
  },[[]]);
  console.log('final result',result)
}

const getAllSubsets2 = (theArray, size) => {
  const result = []
  if (size == 1) {
    console.log(theArray.map(val => [val]))
    return theArray.map(val => [val])
  }
  const generateSet = (array, prefixArray, size) => {
    if (prefixArray.length == size) {
      // console.log(prefixArray)
      result.push(prefixArray)
      return
    }
    for (let i = 0; i < array.length; i++) {
      generateSet(array.slice(i+1), [...prefixArray, array[i]], size)
    }
  }
  generateSet(theArray, [], size)
  console.log('FINAL',result)
  return result
}

getAllSubsets2(Array.from(Array(10).keys()),2)
