import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {userCustomClaims} from "../../helpers/auth/user/user-claims";
import {createUser} from "../../helpers/auth/user/create-user";


admin.initializeApp();


export default async (
    req: functions.https.Request,
    res: functions.Response,
): Promise<any> => {
  console.log("/userSetup start");
  try {


    const {
      input: {id, role, email},
    } = req.body.input;
   
    

    await createUser({
      object: {
        id,
        email,
        role,
      },
    });

    const customClaims = userCustomClaims(id);
    await admin.auth().setCustomUserClaims(id, customClaims);
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Ok",
    });
  } catch (error) {
    console.log("/userSetup end with error");
    console.error(error);
    return res
        .status(400)
        .json({status: "fail", statusCode: 400, message: error});
  }
};