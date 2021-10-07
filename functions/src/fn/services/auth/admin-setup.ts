// eslint-disable-next-line no-unused-vars
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {v4 as uuid} from "uuid";

import {createAdmin} from "../../helpers/auth/admin/create-admin";
import {adminCustomClaims} from "../../helpers/auth/admin/admin-claims";

admin.initializeApp();

const getFirstName = (str : string) => {
  const arr = str.split(" ");
  if (arr.length === 1) {
    return arr[0];
  }
  return arr.slice(0, -1).join(" ");
};

const getLastName = (str : string) => {
  const arr = str.split(" ");
  return arr.slice(-1).join(" ");
};

export default async (
    req: functions.https.Request,
    res: functions.Response,
): Promise<any> => {
  console.log("/adminSetup start");
  try {
    const userId = uuid();
    await admin.auth().createUser({
      uid: userId,
      email: "phnamvu@gmail.com",
      emailVerified: false,
      password: "heyyou234",
      displayName: "Phuong Nam",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully created new user:", userRecord.uid);
          createAdmin({
            object: {
              id: userId,
              email: userRecord.email ? userRecord.email : " ",
              firstName: userRecord.displayName ?
              getFirstName(userRecord.displayName) :
              " ",
              lastName: userRecord.displayName ?
              getLastName(userRecord.displayName) :
              " ",
              role: "ADMIN",
            },
          });
        })
        .catch(function(error) {
          console.log("Error creating new user:", error);
        });

    const customClaims = adminCustomClaims(userId);
    await admin.auth().setCustomUserClaims(userId, customClaims);

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Ok",
    });
  } catch (error) {
    console.log("/adminSetup end with error");
    console.error(error);
    return res
        .status(400)
        .json({status: "fail", statusCode: 400, message: error});
  }
};
