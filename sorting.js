
function SortingVisualizer() {
    var canvas, selection, bubble, quick, insertion, arr, color, current, speed, speedVal, barWidth, offsetStep;
    this.init = function() {
        canvas = document.getElementById("canvas");
        selection = document.getElementById("selection");
        bubble = document.getElementById("bubble");
        quick = document.getElementById("quick");
        insertion = document.getElementById("insertion");
        bubble.addEventListener("click", bubbleSort);
        selection.addEventListener("click", selectionSort);
        quick.addEventListener("click", quickSort);
        insertion.addEventListener("click", insertionSort);
        color = ["red", "green", "yellow", "blue", "pink", "purple", "peru", "palegreen", "silver", "snow", "goldenrod"];
        arr = document.getElementById("arr");
        speed = document.getElementById("speed");
        speed.addEventListener("input", changeSpeed);
        speedVal = 100;
        barWidth = 10;
        offsetStep = 0.5;
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
        if (res.length === 0) {
            alert("enter a valid size");
            return [];
        }
        var sz = res[0];
        barWidth = Math.floor((canvas.width) * 0.95 / sz);
        offsetStep = ((canvas.width) * 0.05 / sz);
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

    var quickSort = function() {
        var arr = getArray();
        current = "quick";
        startQuickSort(arr, 0, arr.length-1);
    };

    var startQuickSort = function(arr, l, r) {
        if (l >= r || current != "quick") return;
        var mid = partition(arr, l, r);
        draw(arr);
        setTimeout(startQuickSort, speedVal, arr, l, mid-1);
        setTimeout(startQuickSort, speedVal, arr, mid+1, r);
    }

    var swap = function(arr ,i, j) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    };

    var partition = function(arr, l, r) {
        var randInd = l + Math.floor(Math.random() * (r-l));
        swap(arr, l, randInd);
        var piv = arr[l];
        var ind = l+1;
        for (var j=l+1; j<=r; j++) {
            if (piv >= arr[j]) {
                swap(arr, ind, j);
                ind += 1;
            }
        }
        swap(arr, ind-1, l);
        return ind-1;
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
        var pen = canvas.getContext("2d");
        pen.clearRect(0, 0, canvas.width, canvas.height);
        var offset = 0;
        //use ctx.save and restore carefully
        for (var i=0; i<arr.length; i++) {
            let randomColor = getRandomColor();
            pen.fillStyle = randomColor;
            pen.fillRect(offset, canvas.height-arr[i], barWidth, arr[i]);
            offset += barWidth + offsetStep;
        }
        pen.restore();
    }
}
