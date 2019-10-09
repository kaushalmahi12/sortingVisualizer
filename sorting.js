
function SortingVisualizer() {
    var canvas, selection, bubble, merge, insertion, arr, color, current, speed, speedVal;
    this.init = function() {
        canvas = document.getElementById("canvas");
        selection = document.getElementById("selection");
        bubble = document.getElementById("bubble");
        merge = document.getElementById("merge");
        insertion = document.getElementById("insertion");
        bubble.addEventListener("click", bubbleSort);
        selection.addEventListener("click", selectionSort);
        merge.addEventListener("click", mergeSort);
        insertion.addEventListener("click", insertionSort);
        color = ["red", "green", "yellow", "blue", "pink"];
        arr = document.getElementById("arr");
        speed = document.getElementById("speed");
        speed.addEventListener("input", changeSpeed);
        speedVal = 100;
    };

    var changeSpeed = function(evt) {
        speedVal = parseInt(evt.target.value);
    }

    var getRandomColor = function() {
        return color[Math.floor(Math.random() * color.length)];
    };

     var  getArray = function() {
        var ar = arr.value;
        ar = ar.split(" ");
        var res = [];
        for (let el of ar) {
            if (el !== "") {
                res.push(parseInt(el));
            }
        }
        var sz = res[0];
        res = [];
        for (var i=0; i<sz; i++) {
            res.push(20 + Math.floor(Math.random() * 550));
        }
        return res;
    };

    var selectionSort = function() {
        var arr = getArray();
        current = "selection";
        startSelectionSort(arr, 0);
    };

    var startSelectionSort = function (arr, i) {
        if (i == arr.length || current !== "selection") return;
        var minInd = i;

        for (var j=i+1; j<arr.length; j++) {
            if (arr[j] < arr[minInd]) {
                minInd = j;
            }
        }
        var tmp = arr[minInd];
        arr[minInd] = arr[i];
        arr[i] = tmp;
        draw(arr);
        setTimeout(startSelectionSort, speedVal, arr, i+1);
    };

    var bubbleSort = function() {
        var arr = getArray();
        current = "bubble";
        startBubbleSort(arr, arr.length-1);
    }

    var startBubbleSort = function(arr, i) {
        if (i == -1 || current !== "bubble") return;
        var maxInd = i;

        for (var j=i-1; j>=0; j--) {
            if (arr[j] > arr[maxInd]) {
                maxInd = j;
            }
        }
        var tmp = arr[maxInd];
        arr[maxInd] = arr[i];
        arr[i] = tmp;
        draw(arr);
        setTimeout(startBubbleSort, speedVal, arr, i-1);
    }

    var mergeSort = function() {
        var arr = getArray();
        current = "merge";
        startMergeSort(arr, 0, arr.length-1);
    };

    var startMergeSort = function(arr, l, r) {
        if (l >= r || current != "merge") return;
        var mid = Math.floor((l+r)/2);
        startMergeSort(arr, l, mid);
        startMergeSort(arr, mid+1, r);
        mergeArray(arr, l, r, mid);
        draw(arr);
    }

    var mergeArray = function(arr, l, r, mid) {
        var res = [];
        var i = l, j = mid+1;
        while (i<=mid || j<=r) {
            if (i > mid) {
                res.push(arr[j++]);
            } else if (j > r) {
                res.push(arr[i++]);
            } else if (arr[i] < arr[j]) {
                res.push(arr[i++]);
            } else {
                res.push(arr[j++]);
            }
        }
        var x= l;
        for(i=0; i<res.length; i++) {
            arr[x++] = res[i];
        }
    }

    var insertionSort = function() {
        var arr = getArray();
        current = "insertion";
        startInsertionSort(arr, 1);
    }

    var startInsertionSort = function(arr, ind) {
        if (current !== 'insertion' || ind >= arr.length) return;
        var cur = ind-1;
        var el = arr[ind];
        for (cur=ind-1; cur >= 0; cur--) {
            if (arr[cur] < el) {
                break;
            }
            arr[cur+1] = arr[cur];
        }
        arr[cur+1] = el;
        draw(arr);
        setTimeout(startInsertionSort, speedVal, arr, ind+1);
    }


    draw = function(arr) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var offset = 0;
        for (var i=0; i<arr.length; i++) {
            ctx.save();
            let randomColor = getRandomColor();
            ctx.fillStyle = randomColor;
            ctx.fillRect(offset, canvas.height-arr[i], 7, arr[i]);
            offset += 10;
        }
    }
}
