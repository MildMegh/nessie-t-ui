import { Link as RouterLink } from "react-router-dom";
import { Link, Box, Container, Stack } from "@mui/material";
import { ReactComponent as Logo } from "../assets/nessie-logo.svg";

const footerExtLinks = [
  {
    title: "Job Aid",
    path: "https://confluencesw.t-mobile.com/display/SIPS/Nessie+Job+Aid",
  },
  {
    title: "Report a Problem",
    path: "https://jirasw.t-mobile.com/servicedesk/customer/portal/14/create/306",
  },
  {
    title: "Feature Request",
    path: "https://jirasw.t-mobile.com/servicedesk/customer/portal/14/create/293",
  },
  {
    title: "Contact Us",
    path: "https://teams.microsoft.com/l/channel/19%3AfwQuY4LRBrXoHW_CvJMBx_QnA0Is5IMLUp1zG6s_UbA1%40thread.tacv2/APTX%20and%20Nessie%20Support?groupId=a3acd457-a8ff-44ac-b68a-6c8d567e9b4e&tenantId=be0f980b-dd99-4b19-bd7b-bc71a09b026c&ngc=true&allowXTenantAccess=true",
  },
];

const footerIntLinks = [{ title: "Terms of Use", path: "terms-of-use" }];

const Footer = () => {
    return (
      <footer>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50px",
            backgroundColor: "primary.main",
            color: "#fff",
            paddingTop: "10px",
          }}
          elevation={3}
        >
          <Container maxWidth="false">
            <Logo fill="#fff" width="75px" />
            <Link
              sx={{ textDecoration: "none", marginLeft: "20px" }}
              href="https://www.t-mobile.com"
              color="inherit"
            >
              {" "}
              &copy; {new Date().getFullYear()}{" "}
            </Link>

            <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            display="inline"
            sx={{ float: "right" }}
          >
            {footerExtLinks.map((link, index) => (
              <Link
                key={`footer-extlink-${index}`}
                data-testid={`footer-extlink-${index}`}
                href={link.path}
                color="inherit"
                underline="none"
                target="_blank"
                rel="noreferrer"
              >
                {link.title}
              </Link>
            ))}
            {footerIntLinks.map((link, index) => (
              <Link
                key={`footer-intlink-${index}`}
                data-testid={`footer-intlink-${index}`}
                color="inherit"
                underline="none"
                component={RouterLink}
                to={link.path}
              >
                {link.title}
              </Link>
            ))}
          </Stack>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;