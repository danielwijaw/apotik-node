module.exports = {
    base_url: function(){
        var base = "http://localhost:3001"
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
    }
}