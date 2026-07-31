require('dotenv').config();
const frontendBaseUrl = process.env.frontend_base_url;
const companyName = process.env.company_name;

const forgotPassword = (firstName, passwordToken) => {
    return `
        <!DOCTYPE html>
<html lang="en" style="width: 100%; height: 100%;">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName}</title>
</head>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>

<body style="width: 100%; height: 100%;">
    <table width="100%">
        <tr>
            <td align="center">
                <table style="width: 90%;
                text-align: center;
                margin: 2rem 0;
                box-shadow: -2px 0px 20px 3px #0000004d;
                padding: 1rem;">
                    <tr>
                        <td style="border-radius: 50%;
                        overflow: hidden;
                        display: inline-block;">
                            <a href="${frontendBaseUrl}/">
                                <img src="data:image/png;base64,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" alt="logo" style="float: inline-start;">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th style="padding-top: 1rem;">
                            <h1>Reset your password</h1>
                        </th>
                    </tr>
                    <tr>
                        <td style="padding-top: 1rem;">
                            <p>Hey <span>${firstName}</span>, a request has been received to change the password for your <span>${companyName}</span> account</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 1rem;">
                            <a href="${frontendBaseUrl}/forgot_password/${passwordToken}" style="text-decoration: none;
                            background-color: orange;
                            color: black;
                            padding: 1rem 2rem;
                            border-radius: 10px;
                            border: 1px solid black;
                            display: inline-block;">
                                <b>Reset Password</b>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 1rem;">
                            <p>If the link didn't work, paste this link to your browser:</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 0.5rem;">
                            <a href="https://maxxcam-client.vercel.app/forgot_password/${passwordToken}" style="text-decoration: none !important;">https://maxxcam-client.vercel.app/reset_password/${passwordToken}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 1rem;">
                            <p>If you didn't request a password change, simply ignore this email</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `;
};

module.exports = forgotPassword;