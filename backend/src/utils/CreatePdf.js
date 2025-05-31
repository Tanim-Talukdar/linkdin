import fs from "fs";
import PDFDocument from "pdfkit";
import crypto from "crypto";


export const convertUserDataTOPDF = async (userProfile) => {
    const doc = new PDFDocument();

    const outputPath = crypto.randomBytes(32).toString("hex")+ ".pdf";
    const stream = fs.createWriteStream("uploads/" + outputPath);

    doc.pipe(stream);

    doc.image(`uploads/${userProfile.userId.profilePicture.filename}` , {align: "center", width: 100})
    doc.fontSize(14).text(`Name: ${userProfile.userId.name}`);
    doc.fontSize(14).text(`Username: ${userProfile.userId.username}`);
    doc.fontSize(14).text(`Email: ${userProfile.userId.Email}`);
    doc.fontSize(14).text(`Bio: ${userProfile.bio}`);
    doc.fontSize(14).text(`Current Position: ${userProfile.currentPositon}`);

    doc.fontSize(14).text("Past Work: ");
    userProfile.pastWork.forEach((work) => {
        doc.fontSize(14).text(`Company Name: ${work.company}`);
        doc.fontSize(14).text(`Position: ${work.position}`);
        doc.fontSize(14).text(`Years: ${work.years}`);
    })
    doc.end();
    return outputPath;
};