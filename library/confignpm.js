module.exports = {
    base_url: function(){
        var base = "http://apotek.local"
        return base
    },

    local_url: function(){
        var base = "http://apotek.local"
        return base
    },

    titleCase: function(str){
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    },

    codeCase: function(str){
        var splitStr = str.toLowerCase().split('_');
        for (var i = 0; i < splitStr.length; i++ ){
            splitStr[i] = splitStr[i].charAt(0).toUpperCase()
        }
        return splitStr.join('')+'_';
    },

    objectToArray: function(obj){
        let sol = []
        for (key in obj){
            sol.push([key, obj[key]])
        }
        return sol
    }
}