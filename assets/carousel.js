function carousel() {
    var ul = document.getElementsByTagName('ul'), li = document.getElementsByTagName('li');

    function removeImg() {
        ul[0].removeChild(li[0]);
    };

    function insertImg() {
         var clone = li[0].cloneNode(true);
        ul[0].appendChild(clone);
    };

    function start(millisec) {
         setInterval(function() {
            insertImg();
            removeImg();
        }, millisec);
    };
start(7000);

};
