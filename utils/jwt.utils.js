var jwt = require ('jsonwebtoken');

const JWT_SIGN_SECRET= '254584efereklr54::g/TBtttt/MTHTB:r#@effrrr';

module.exports = {

generateTokenForUser :function(userData){

    return jwt.sign(
        {
        UserId: userData.id,
        UserName: userData.username,
        UserNumTel: userData.numtel,
        UserDescrip: userData.descrip,
        UserImage: userData.image,
       },
       JWT_SIGN_SECRET,
       {
           expiresIn : '100h'
       } )
},

parseAuthorization : function(authorization){
    return (authorization != null ) ? authorization.replace('Bearer ', '') : null;
},

getUserId : function(authorization){
var UserId = -1;
var token = module.exports.parseAuthorization(authorization);
if(token != null){

try{
    var jwtoken = jwt.verify(token, JWT_SIGN_SECRET);
    if (jwtoken != null){
      UserId = jwtoken.UserId;
      UserName = jwtoken.UserName;
      UserNumTel = jwtoken.UserNumTel;
      UserDescrip = jwtoken.UserDescrip;
      UserImage = jwtoken.UserImage;
    }

}catch(err){ }
}
return UserId;

}

}