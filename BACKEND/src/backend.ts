import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import { accountModel, feedbackdetailsModel, linkdetailsModel, tagdetailsModel } from "./database";
import jwt from "jsonwebtoken";
import z from "zod";
import bcrypt from "bcryptjs";
import cors from "cors";
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY!);
const JWT_SECRET = process.env.JWT_SECRET!;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "https://stack-app-kappa.vercel.app",
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});  

// Sign up route
app.post("/v1/signup", async (req: Request, res: Response): Promise<any> => {
    const signupSchema = z.object({
        fullname: z.string().min(1, { message: "Fullname is required" }),

        username: z.string()
            .min(5, { message: "Username must be at least 6 characters" })
            .max(10, { message: "Username must be at most 10 characters" }),

        email: z.string().email({ message: "Invalid email address" }),

        password: z.string()
            .min(6, { message: "Password must be at least 6 characters" })
            .max(10, { message: "Password must be at most 10 characters" }),
    });

    const parseResult = signupSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const { fullname, username, email, password } = parseResult.data;

    const find1 = await accountModel.findOne({
        username: username
    });

    if (find1) {
        return res.status(402).json({
            message: "An account with this username already exists!"
        });
    }

    const find2 = await accountModel.findOne({
        email: email
    });

    if (find2) {
        return res.status(403).json({
            message: "An account with this email already exists!"
        });
    }

    else {
        const hashedPassword: string = await bcrypt.hash(password, 10);

        try {
            await accountModel.create({
                fullname: fullname,
                username: username,
                email: email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "Account created successfully"
            });
        }
        catch (e) {
            return res.status(500).json({
                message: "Server error"
            });
        }
    }
});

// Email verification
// @ts-ignore
app.post("/v1/emailverify", async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const response = await resend.emails.send({
            from: 'no-reply@stackforweb.space',
            to: email,
            subject: "Email Verification - Stack",
            html: 
            `
            <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!--><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:520px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center">
																	<div class="fullWidth" style="max-width: 500px;"><img src="https://f5017dd061.imgdist.com/pub/bfra/54cfz8v8/xah/inb/p5m/blue-and-black-light-illustration-4871011.jpg_thumb.png" style="display: block; height: auto; border: 0; width: 100%;" width="500" alt title height="auto"></div>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 46px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Stack</span></h1>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#101112;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">Never Lose a Link Again.</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="divider_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #000000;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">Hey folk,</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">Thank you for signing up! To complete your email verification, please use the one-time password (OTP) below -</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #1e0e4b; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 46px;"><span class="tinyMce-placeholder" style="word-break: break-word;">${otp}</span></h1>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">If you didn’t request this, please ignore this email — your account is safe.</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-9" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">Regards,</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-10" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																	<p style="margin: 0;">Ashish Raut</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
														<tr>
															<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																<!--[if !vml]><!-->
																<table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
																	<tr>
																		<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" target="_blank" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
																		<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" target="_blank" style="color: #1e0e4b; text-decoration: none;">Designed with Beefree</a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>
            `,
        });
        return res.status(200).json({ message: "OTP sent successfully", data: response });

    } catch (error) {
        console.error("Resend Error:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
    }
});

// Check for existing email
app.post("/v1/check", async (req: Request, res: Response): Promise<any> => {
    const email: string = req.body.email;

    try {
        const verifyUser = await accountModel.findOne({ 
            email : email 
        });

        if (verifyUser) {
            return res.status(400).json({
                message: "Account with this email already exists!"
            });
        }

        return res.status(200).json({
            message: "Email is available."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
});

// Log in route
app.post("/v1/login", async (req: Request, res: Response): Promise<any> => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const verifyUser: any = await accountModel.findOne({
        email: email
    });

    const username = verifyUser.username;

    if (!verifyUser) {
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const verify = await bcrypt.compare(password, verifyUser.password);

    if (!verify) {
        return res.status(400).json({
            message: "Invalid Credentials."
        });
    }

    const token = jwt.sign({
        username
    }, JWT_SECRET);

    return res.status(200).json({
        message: token
    });
});

// Middleware
function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["token"] as string;

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided!"
        });
    }

    try {
        const verify: any = jwt.verify(token, JWT_SECRET);
        (req as any).username = verify.username;
        next();
    }

    catch (e) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

const invites = new Map<string, { username: string; expiresAt: number }>();

// Route: Generate Invite
app.get('/v1/generate-invite', (req: Request, res: Response): any => {
    const token = uuidv4();
    const username = req.query.username as string;

    if (!username) {
        return res.status(400).json({ error: 'Missing username' });
    }

    const expiresAt = Date.now() + 60 * 60 * 1000;
    invites.set(token, { username, expiresAt });

    return res.json({ token });
});

app.get('/v1/validate-invite/:token', (req: Request, res: Response): any => {
    const { token } = req.params;
    const invite = invites.get(token);

    if (!invite || Date.now() > invite.expiresAt) {
        return res.json({ valid: false });
    }

    return res.json({ valid: true, username: invite.username });
});
// Feedback
app.post("/v1/feedback", auth as any, async (req: Request, res: Response): Promise<any> => {
    const username = (req as any).username;
    const text = req.body.text;

    try {
        await feedbackdetailsModel.create({
            username: username,
            text: text
        });

        res.status(200).json({
            messgae: "Feedback added successfully"
        });
    }

    catch (e) {
        res.status(500).json({
            message: "An error occured while adding the link!"
        });
    }
});

// User details
app.get("/v1/userDetail", auth as any, async (req: Request, res: Response): Promise<any> => {
    const username = (req as any).username;

    try {
        const findUser = await accountModel.findOne({
            username: username
        });

        if (!findUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.json({
            message: {
                fullname: findUser.fullname,
                username: findUser.username,
                email: findUser.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Add Tag
app.post("/v1/addTag", auth as any, async (req: Request, res: Response): Promise<any> => {
    const username = (req as any).username;

    const { tagname, color } = req.body;

    if (!tagname || !color) {
        return res.status(400).json({ message: "Tagname and Color are required" });
    }

    try {
        const checkExistingTag = await tagdetailsModel.findOne({
            username: username,
            tagname: tagname.trim().toLowerCase()
        });
        
        if(checkExistingTag){
            return res.status(400).json({
                message: "Tag already exists!"
            });
        }

        const tagCount = await tagdetailsModel.countDocuments({ username });
        if(tagCount >= 4) {
            return res.status(404).json({ 
                message: "Maximum of 4 tags allowed." 
            });
        }

        else{
            await tagdetailsModel.create({
                username: username,
                tagname: tagname,
                color: color
            });
            return res.status(201).json({
                message: "Tag created successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
});

// Delete tag
// @ts-ignore
app.delete("v1/deletetag", auth as any, async (req: Request, res: Response) => {
    const username = (req as any).username;
    const tagname = req.body.tagname;

    try {
        const deleted = await tagdetailsModel.findOneAndDelete({
            username : username,
            tagname : tagname
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Tag not found!"
            });
        }

        res.status(200).json({
           message: "Deleted successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "An error occurred while deleting the link!"
        });
    }
});

// Get all tags
app.get("/v1/getalltags", auth as any, async (req: Request, res: Response) => {
    const username = (req as any).username;

    try {
        const getTags = await tagdetailsModel.find({
            username: username
        });
        res.status(200).json({
            message: getTags
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error"
        });
    }
});

// Add link
app.post("/v1/addlink", auth as any, async (req: Request, res: Response): Promise<any> => {
    const username = (req as any).username;
    
    const { title, link, desc, tags, source } = req.body;

    if (!title || !link) {
        res.status(401).json({
            message: "Title and message are required!"
        });
    }

    try {
        const checkLink = await linkdetailsModel.findOne({
            username: username,
            link: link
        });

        if (checkLink) {
            return res.status(400).json({
                message: "Link already exists!"
            });
        }

        await linkdetailsModel.create({
            username: username,
            title: title,
            link: link,
            description: desc,
            tags: tags,
            source: source
        });
        res.status(200).json({
            messgae: "Link added successfully"
        });
    }

    catch (e) {
        res.status(500).json({
            message: "An error occured while adding the link!"
        });
    }

});

// Get all link
app.get("/v1/getall", auth as any, async (req: Request, res: Response) => {
    const username = (req as any).username;

    try {
        const getLinks = await linkdetailsModel
            .find({ username: username })
            .populate({
                path: "tags",
                model: "tagdetails"
            });

        console.log(getLinks);
            
        res.status(200).json({
            message: getLinks
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error"
        });
    }
});

// Get one link 
app.get("/v1/link/:id", auth as any, async (req: Request, res: Response) => {
    const linkId = req.params.id;

    try {
        const link = await linkdetailsModel.findById(linkId);
        if (!link) {
            res.status(404).json({
                message: "Link not found"
            });
        }

        res.status(200).json({
            message: link
        });

    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching link"
        });
    }
});

// Update the link
app.put("/v1/link/:id", auth as any, async (req: Request, res: Response) => {
    const linkId = req.params.id;

    const username = (req as any).username;

    const title: string = req.body.title;
    const description: string = req.body.description;
    const tags: string[] = req.body.tags;
    const source: string = req.body.source;
    const link: string = req.body.link;

    if (!title || !source) {
        res.status(401).json({
            message: "Title and message are required!"
        });
    }

    try {
        const updated = await linkdetailsModel.findOneAndUpdate(
            { _id: linkId, username: username },
            {
                title,
                description,
                tags,
                source,
                link
            },
            { new: true }
        );

        if (!updated) {
            res.status(404).json({
                message: "Link not found or you're not the owner."
            });
        }

        res.status(200).json({
            message: "Link updated successfully!",
            data: updated
        });
    }

    catch (e) {
        res.status(500).json({
            message: "An error occured while updating the link!"
        });
    }
});

// Delete link
// @ts-ignore
app.delete("/v1/deletelink", auth as any, async (req: Request, res: Response) => {
    const username = (req as any).username;
    const title: string = req.body.title;
    const link: string = req.body.link; 

    try {
        const deleted = await linkdetailsModel.findOneAndDelete({
            username,
            title,
            link,
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Link not found!"
            });
        }

        res.status(200).json({
            message: "Deleted successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "An error occurred while deleting the link!"
        });
    }
});

// INVITE
// User details
app.get("/v1/userdetailsinvite/:username", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;

    try{
        const response = await accountModel.findOne({
            username: username
        });

        if(!response){
            return res.status(404).json({
                message: "User not found"
            });
        }
        else{
            return res.status(200).json({
                // @ts-ignore
                message: response
            });
        }
    }
    catch(e){
        console.log(e);
    }
});

// get all links
app.get("/v1/linkdetailsinvite/:username", async (req: Request, res: Response): Promise<any> => {
    const username = req.params.username;

    try{
        const response = await linkdetailsModel.find({
            username: username
        });
        if(!response){
            return res.status(404).json({
                message: "User not found"
            });
        }
        else{
            res.status(200).json({
                message: response
            });
        }
    }
    catch(e){
        console.log(e);
    }
});

// Listening route

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
