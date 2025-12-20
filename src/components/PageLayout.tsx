import React from "react"; // comment: react import
import Container from "@mui/material/Container"; // comment: page container
import Typography from "@mui/material/Typography"; // comment: title text
import Box from "@mui/material/Box"; // comment: spacing/layout

type Props = { // comment: component props
  title?: string; // comment: optional page title
  children: React.ReactNode; // comment: page content
};

const PageLayout: React.FC<Props> = ({ title, children }) => { // comment: layout component
  return (
    <Container maxWidth="lg"> {/* comment: centered container */}
      {title && ( // comment: show title only if provided
        <Box sx={{ mt: 4, mb: 3 }}> {/* comment: spacing */}
          <Typography variant="h4">
            {title}
          </Typography>
        </Box>
      )}

      <Box sx={{ pb: 6 }}> {/* comment: page content spacing */}
        {children}
      </Box>
    </Container>
  );
};

export default PageLayout; // comment: export

