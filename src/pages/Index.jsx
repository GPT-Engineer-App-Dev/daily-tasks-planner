import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, IconButton, Spacer, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      toast({
        title: "Please enter a todo",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={8}>Todo App</Heading>
      <form onSubmit={handleSubmit}>
        <HStack>
          <Input variant="filled" placeholder="Enter a todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <IconButton colorScheme="blue" px={8} type="submit" icon={<FaPlus />} />
        </HStack>
      </form>

      <VStack spacing={4} mt={8} alignItems="stretch">
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Text>{todo.text}</Text>
            <Spacer />
            <IconButton icon={<FaTrash />} onClick={() => deleteTodo(todo.id)} />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
