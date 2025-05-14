import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "react-native"
import { BookProvider } from "./context/BookContext"
import HomeScreen from "./screens/HomeScreen"
import BookDetailScreen from "./screens/BookDetailScreen"
import AddBookScreen from "./screens/AddBookScreen"
import EditBookScreen from "./screens/EditBookScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4361ee",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Book Management" }} />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: "Book Details" }} />
          <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: "Add New Book" }} />
          <Stack.Screen name="EditBook" component={EditBookScreen} options={{ title: "Edit Book" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookProvider>
  )
}
