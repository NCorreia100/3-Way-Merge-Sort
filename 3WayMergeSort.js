const threeWayMergeSort = (array) => {

    //after array is broken down, sort the elems using insertion sort and return array 
    if (array.length <= 3) {
        let sortedArr = [array.shift()];
        while (array.length > 0) {
            if (array[0] < sortedArr[0]) sortedArr.unshift(array.shift())
            else if (array[0] > sortedArr[sortedArr.length - 1]) sortedArr.push(array.shift())
            //edge case: remaining element to append will be nested between the other 2
            else sortedArr.splice(1, 0, array.pop())
        }
        return sortedArr;
    }
    //divide array into 3 equal sections (maintaining 1/3 of the original array)  O( 2/3N )  
    let initialSize = array.length, partialSize = Math.floor(array.length / 3)
    let arr1 = array.splice(0, partialSize), arr2 = array.splice(0, partialSize);

    // //recursively sort the 3 sections O( logN )
    arr1 = threeWayMergeSort(arr1), arr2 = threeWayMergeSort(arr2), array = threeWayMergeSort(array);

    //merge the 3 arrays through insert sort and by shifting the lowest value O( N )
    let sortedArr = [];
    for (let i = 0; i < initialSize; i++) {
        if (arr1[0] <= arr2[0] || arr2.length === 0) {
            if (arr1[0] <= array[0] || array.length === 0) sortedArr.push(arr1.shift());
            else sortedArr.push(array.shift());
        } else {
            if (arr2[0] <= array[0] || array.length === 0) sortedArr.push(arr2.shift());
            else sortedArr.push(array.shift());
        }
    }
    return sortedArr;
}

//testing
console.log(threeWayMergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]))