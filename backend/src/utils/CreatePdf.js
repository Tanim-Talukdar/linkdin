import PDFDocument from "pdfkit";
import fetch from "node-fetch";

export const convertUserDataTOPDF = async (userProfile, res) => {
  const doc = new PDFDocument();

  // Set response headers so browser knows it's a PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="user.pdf"`);

  doc.pipe(res); // Pipe directly to response

  // Fetch image from Cloudinary
  try {
    const response = await fetch(userProfile.userId.profilePicture.path);
    if (response.ok) {
      const imageBuffer = Buffer.from(await response.arrayBuffer());
      doc.image(imageBuffer, { align: "center", width: 100 });
    }
  } catch (err) {
    console.log("Failed to fetch image:", err.message);
  }

  doc.fontSize(14).text(`Name: ${userProfile.userId.name}`);
  doc.fontSize(14).text(`Username: ${userProfile.userId.username}`);
  doc.fontSize(14).text(`Email: ${userProfile.userId.Email}`);
  doc.fontSize(14).text(`Bio: ${userProfile.bio}`);
  doc.fontSize(14).text(`Current Position: ${userProfile.currentPositon}`);

  doc.fontSize(14).text("Past Work:");
  userProfile.pastWork.forEach((work) => {
    doc.fontSize(14).text(`Company Name: ${work.company}`);
    doc.fontSize(14).text(`Position: ${work.position}`);
    doc.fontSize(14).text(`Years: ${work.years}`);
  });

  doc.end();
};
