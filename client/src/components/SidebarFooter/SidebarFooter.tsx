import styled from "@emotion/styled";
import React from "react";
import { TypographyProReact } from "../Typography/Typography";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    collapsed?: boolean;
}

const StyledButton = styled.a`
    padding: 5px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    display: inline-block;
    background-color: #fff;
    color: #484848;
    text-decoration: none;
`;

const StyledSidebarFooter = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    color: white;
    background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
    /* background: #0098e5; */
`;

const StyledCollapsedSidebarFooter = styled.a`
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    color: white;
    background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
    /* background: #0098e5; */
`;

const codeUrl =
    "https://github.com/azouaoui-med/react-pro-sidebar/blob/master/storybook/Playground.tsx";

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
    children,
    collapsed,
    ...rest
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
            }}
        >
            {collapsed ? (
                <StyledCollapsedSidebarFooter>
                    <img src='icon.png ' alt='logotype' />
                </StyledCollapsedSidebarFooter>
            ) : (
                <StyledSidebarFooter {...rest}>
                    <div style={{ marginBottom: "12px" }}>
                        <img src='icon.png' alt='logotype' />
                    </div>
                    <TypographyProReact fontWeight={600}>
                        Listener
                    </TypographyProReact>
                    <div style={{ marginTop: "16px" }}>
                        <StyledButton>
                            <TypographyProReact
                                variant='caption'
                                color='#607489'
                                fontWeight={600}
                            >
                                Contact us
                            </TypographyProReact>
                        </StyledButton>
                    </div>
                </StyledSidebarFooter>
            )}
        </div>
    );
};
