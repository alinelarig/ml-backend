const AUTHOR_NAME = "Aline";
const AUTOR_LASTNAME = "Lariguet"

module.exports = {
    bodyAuthorAppender: function modifyResponseBody(req, res, next) {
        var oldSend = res.send;
        res.send = function(data){
        
            const author = JSON.stringify({
                    name: AUTHOR_NAME,
                    lastname: AUTOR_LASTNAME
            })
            
            arguments[0] = '"items": ' + arguments[0];
            arguments[0] = '{"author" : ' + author + ", "  + data + "}";
              
            oldSend.apply(res, arguments);
        }
        next();
    } , 
    bodyAuthorCategoriesAppender: function modifyResponseBody(req, res, next) {
        var oldSend = res.send;
    
        res.send = function(data){
        
            let categories = JSON.parse(data).map((e) => e.category);
            const author = JSON.stringify({
                    name: AUTHOR_NAME,
                    lastname: AUTOR_LASTNAME
            })
            
            arguments[0] = '"items": ' + arguments[0];
            arguments[0] = '{"author" : ' + author + "," + '"categories": '+ JSON.stringify(categories) + ', ' + data + "}";
            
              
            oldSend.apply(res, arguments);
        }
        next();
    }    
    
}

