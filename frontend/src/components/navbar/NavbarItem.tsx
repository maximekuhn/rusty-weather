import {Link} from "react-router-dom";
import React, {ReactNode} from "react";
import {Box, Center} from "@chakra-ui/react";

interface NavbarItemProps {
    pathTo: string;
    isActive: boolean;
    onClick: () => void;
    children: ReactNode;
}

function NavbarItem({pathTo, isActive, onClick, children}: NavbarItemProps) {
    return (
        <Box w={"25%"} h={"100%"} onClick={onClick}>
            <Center h={"100%"}>
                <Link to={pathTo}>
                    {children}
                </Link>
            </Center>
        </Box>
    );
}

export default NavbarItem;