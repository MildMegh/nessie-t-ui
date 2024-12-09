import { Typography, Container  } from "@mui/material";
import PageHeader from "../components/PageHeader";

const Terms = () => {
    return (
        <Container maxWidth={false}>
            <PageHeader title="Terms of use" divider />
            <Typography maxWidth={"600px"} component="p">
            Socket Mobile, Inc. Web Site (www.socketmobile.com) Terms of Use and Legal Restrictions.

            Please read these terms carefully before using our website ("Website", "Site" or "Sites"). 
            You indicate your acceptance of these terms by your use of the Website. If you do not accept
            these terms, then you should not use the Website. The word "Socket", "we", "us" or "our" means
            Socket Mobile, Inc. The word "you" or "your" is intended to identify the person or organization using the Website.

            Use of our Website. We authorize you to use our Website to view and download information, to shop, and to
            communicate with us, subject to your following the terms that we outline in this section and on specific Sites. 
            In general, we have copyrighted the materials on our Website and third parties have copyrighted the materials that
            appear on the third party Websites for which we have provided you with links. You may use Site information for your
            personal, noncommercial use, providing that you retain all copyright and other proprietary notices on any copies of
            the information. Except as otherwise indicated on specific Sites, you may not modify the materials on our Website in
            any way or use them for any commercial purposes without our permission. Should you wish to use materials on our Website
            for commercial purposes, you may contact us to request permission from an officer of Socket Mobile.

            Downloading Software. Software that is downloaded from our Website is subject to the terms of the Software License Agreement 
            that accompanies the Software. Use of the Software indicates your acceptance of the terms of the Software license.
            </Typography>
        </Container>
    );
};

export default Terms;