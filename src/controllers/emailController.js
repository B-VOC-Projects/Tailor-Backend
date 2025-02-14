const sendEmail = require("../utils/emailService");

exports.sendStatusEmail = async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await sendEmail(email, subject, message);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
    }
};

// Send order status update email
exports.sendOrderUpdateEmail = async (req, res) => {
    try {
        const { email, orderId, status, estimatedCompletion } = req.body;

        if (!email || !orderId || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const subject = `Your Product Status Update – ${orderId}`;
        // const message = `Dear Customer,\n\nWe hope you're doing well! We wanted to update you on the progress of your order (${orderId}):\n\n`
        // + `Current Status: ${status}\n`
        //     + `Estimated Completion: ${estimatedCompletion || "TBA"}\n\n`
        //     + `If you have any questions, feel free to reply to this email.\n\n`
        //     + `Best regards,\n[Your Tailor Shop Name]`;
        // const htmlMessage = `
        //     <html>
        //     <head>
        //         <style>
        //             body {
        //                 font-family: Arial, sans-serif;
        //                 margin: 0;
        //                 padding: 0;
        //                 background-color: #f4f4f4;
        //             }
        //             .container {
        //                 max-width: 600px;
        //                 margin: 20px auto;
        //                 background: #ffffff;
        //                 padding: 20px;
        //                 border-radius: 8px;
        //                 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        //             }
        //             .header {
        //                 background: #007bff;
        //                 color: white;
        //                 padding: 15px;
        //                 text-align: center;
        //                 font-size: 20px;
        //                 border-top-left-radius: 8px;
        //                 border-top-right-radius: 8px;
        //             }
        //             .content {
        //                 padding: 20px;
        //                 text-align: left;
        //                 color: #333;
        //             }
        //             .button {
        //                 display: inline-block;
        //                 padding: 12px 20px;
        //                 margin-top: 10px;
        //                 background: #007bff;
        //                 color: white;
        //                 text-decoration: none;
        //                 font-weight: bold;
        //                 border-radius: 5px;
        //             }
        //             .footer {
        //                 margin-top: 20px;
        //                 font-size: 12px;
        //                 text-align: center;
        //                 color: #666;
        //             }
        //         </style>
        //     </head>
        //     <body>
        //         <div class="container">
        //             <div class="header">Your Order Status Update</div>
        //             <div class="content">
        //                 <p>Dear Customer,</p>
        //                 <p>We hope you're doing well! We wanted to update you on the progress of your order <strong>#${orderId}</strong>:</p>
        //                 <ul>
        //                     <li><strong>Current Status:</strong> ${status}</li>
        //                     <li><strong>Estimated Completion:</strong> ${estimatedCompletion || "TBA"}</li>
        //                 </ul>
        //                 <p>If you have any questions, feel free to reply to this email.</p>
        //                 <a href="https://yourtailorshop.com/orders/${orderId}" class="button">View Order</a>
        //             </div>
        //             <div class="footer">
        //                 Best regards,<br>
        //                 <strong>Bvoc Tailor Shop</strong> <br>
        //                 <small>Contact us: support@yourtailorshop.com</small>
        //             </div>
        //         </div>
        //     </body>
        //     </html>`;
        const htmlMessage = `<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: #007bff;
                    color: white;
                    padding: 15px;
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .content {
                    padding: 20px;
                    text-align: left;
                    color: #333;
                }
                .progress-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 20px 0;
                }
                .progress-bar {
                    width: 100%;
                    height: 10px;
                    background: #ddd;
                    border-radius: 5px;
                    position: relative;
                }
                .progress-fill {
                    height: 10px;
                    background: #007bff;
                    border-radius: 5px;
                }
                .status {
                    text-align: center;
                    font-weight: bold;
                    margin-top: 10px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 20px;
                    margin-top: 15px;
                    background: #28a745;
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 5px;
                    text-align: center;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    text-align: center;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Your Product Status Update</div>
                <div class="content">
                    <p>Dear Customer,</p>
                    <p>We are excited to update you on the progress of your custom-made product!</p>
                    <p><strong>Product Name:</strong> Shirt </p>
                    <p><strong>Current Status:</strong> ${status}</p>
        
                    <p>Estimated Completion Date: <strong>${estimatedCompletion || "TBA"}</strong></p>
        
                    <p>If you have any questions, feel free to reply to this email.</p>
        
                    <a href="https://yourtailorshop.com/products/${orderId}" class="button">Track Your Product</a>
                </div>
                <div class="footer">
                    Best regards,<br>
                    <strong>B.voc Tailor Shop</strong> <br>
                    <small>Contact us: support@Bvoctailorshop.com</small>
                </div>
            </div>
        </body>
        </html>
        `
        await sendEmail(email, subject, htmlMessage );

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
    }
};
