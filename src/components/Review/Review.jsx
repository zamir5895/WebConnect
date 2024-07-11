import React from "react";
import { Paper, Text, Group, Rating } from "@mantine/core";


const Review = ({ name, rating, text, date, imgurl }) => (
    <Paper shadow="sm" p="md" radius="md">
        <Group position="apart">
            <img src={imgurl} alt="user" width="40" height="40" />
            <Text weight={500}>{name}</Text>
            <Rating value={rating} readOnly />
            <Text size="sm" weight={500}>{date}</Text>
        </Group>
        <Text mt="sm">{text}</Text>
    </Paper>
);

export default Review