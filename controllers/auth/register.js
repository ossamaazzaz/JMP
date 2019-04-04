const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const UserInfo = require("../../models/UsersInfo");
module.exports = async (req, res) => {
	try{

		// getting the user info from request body
		const email = req.body.email.toLowerCase();
		const password = req.body.password;
		const password_conf = req.body.password_conf;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const userName = req.body.userName;
		const numTéléphone = req.body.numTéléphone;
		const avatar = req.body.avatar;
		const bio = req.body.bio;
		let skills = req.body.skills;
		const lien_fcb = req.body.lien_fcb;
		const lien_insta = req.body.lien_insta;
		const lien_twitter = req.body.lien_twitter;
		const lien_github = req.body.lien_github;
		
		//making skills lower case
		if (skills){
			skills = skills.toLowerCase().replace(/, /g, ',');
		}
		
		// validating the info
		let validationErrors = [];
		req.check('email','Email is not valid').notEmpty().isEmail();
		req.check('userName',"userName is required").notEmpty();

		// if the email or userName is valide
		if(req.validationResult().length==1 || !req.validationResult()){
			//cheking if email and userName are unique
			let user = User.findOne({
				where:{
					email : email
				}
			});
			let userInfo = (UserInfo.findOne({
				where:{
					userName : userName
				}
			}));
			[user,userInfo] = await Promise.all([user,userInfo]);
			// if email is already used
			if (user){
				validationErrors.push({
				"location": "body",
				"param": "email",
				"msg": "email already in use",
				});
			}
			// if userName is already used
			if (userInfo){
				validationErrors.push({
				"location": "body",
				"param": "userName",
				"msg": "userName already in use",
				});
			}

		}

		req.check('password')
		.isLength({min:8}).withMessage('password must be at least 8 characters long')
		.matches('[0-9]').withMessage('password must contain at least one number')
    	.matches('[a-z]').withMessage('password must contain at least one lowercase letter')
    	.matches('[A-Z]').withMessage('password must contain at least one uppercase letter');
		req.check('password_conf','Passwords does not match').equals(req.body.password);
		const errors = req.validationResult();
		// if there is some  inpute errors add them to validationErrors
		if(errors){
			errors.forEach(err =>{
				validationErrors.push(err);
			});
		}
		//if there is errors render the rgistration page with errors
		if(validationErrors.length > 0){
			res.render('register',{
				errors : validationErrors
				});
			
		} else {
			//creating the user + userinfo
			let newUser = {
				email,
				password
			};
			let newUserInfo= {firstName,lastName,userName,numTéléphone,avatar,bio,skills,lien_fcb,lien_insta,lien_twitter,lien_github};

			// hashing the password before storing it
			bcrypt.genSalt(10,(err,salt)=>{
				if (err){
					console.log("error :"+err);
				}
				bcrypt.hash(newUser.password,salt,async(err,hash)=>{
					if(err) {
						console.log("error :"+err);
					} else {
						newUser.password = hash;
						user = await (User.create(newUser));
						newUserInfo.userId =user.id; 
						await(UserInfo.create(newUserInfo));
						req.flash('success , You now registred and can login');
						res.redirect("/auth/login");		
					}
				});
			});
		};
	} catch(err) {
		console.log(err);
		res.render('register',{
				errors : [{"msg" : "An error had occurred"}]
				});
	};
	
}
