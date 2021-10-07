"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors")({
    origin: true,
});
exports.default = async (req, res) => {
    console.log("/submitDonetask");
    // const {
    //   input: {taskName, ownerMail, displayname, url},
    // } = req.body.input;
    const taskName = "aaa";
    const ownerMail = "phnamvu@gmail.com";
    const displayname = "Nam";
    const url = "https://google.com";
    try {
        return cors(req, res, () => {
            const text = `<div>
      <h4>${displayname} just move task: ${taskName} to done</h4>
      <ul>
        <li>
          Name - ${displayname || ""}
        </li>
        <li>
          View task - <a href=${url}'>Link</a>
        </li>
      </ul>
      
    </div>`;
            const sesAccessKey = "team4mco@outlook.com";
            const sesSecretKey = "200421team4";
            const transporter = nodemailer.createTransport(smtpTransport({
                host: "smtp-mail.outlook.com",
                // port for secure SMTP
                port: 587,
                tls: {
                    ciphers: "SSLv3",
                },
                auth: {
                    user: sesAccessKey,
                    pass: sesSecretKey,
                },
            }));
            const mailOptions = {
                to: ownerMail,
                from: sesAccessKey,
                subject: `${taskName} is Done`,
                text: text,
                html: text,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error.message);
                }
                res.status(200).json({
                    status: "success",
                    statusCode: 200,
                    message: "Ok",
                });
            });
        });
    }
    catch (error) {
        console.log("/submitDoneTask end with error");
        console.error(error);
        return res
            .status(500)
            .json({ status: "fail", statusCode: 500, message: error });
    }
};
//# sourceMappingURL=submit-done-task.js.map