#include <iostream>
#include <string>

int main() {
    std::string str = "hello world";
    char target = 'l';

    // Erase all occurrences of 'target' from the string
    auto it = std::remove(str.begin(), str.end(), target);

    std::cout << "Modified string: " << str << std::endl;

    return 0;
}
