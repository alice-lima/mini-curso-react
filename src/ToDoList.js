import React from 'react';
import { ListGroup } from 'react-bootstrap';

export const ToDoList = ({ items, handleClick }) => (
    <ListGroup>
        { !!items && items.map(item => 
            <ListGroup.Item
                variant = {item.variant} 
                onClick = {() => handleClick(item)}
            > 
                { item.title }

                { item.variant === 'success' && (
                    " - OK"
                )}
            </ListGroup.Item>
        )}
    </ListGroup>
)