import Register from "../comps/Register"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"

describe("Register Form Testing", () => {

    it("Should render register form title", () => {

        render(<Register />)

        const title = screen.getByText("Register Form")

        expect(title).toBeInTheDocument()
    })

    it("Should allow user to type full name", () => {

        render(<Register />)

        const input = screen.getByTestId("fullname")

        fireEvent.change(input, {
            target: { value: "Khadija" }
        })

        expect(input.value).toBe("Khadija")
    })

    it("Should allow user to type email", () => {

        render(<Register />)

        const input = screen.getByTestId("email")

        fireEvent.change(input, {
            target: { value: "test@gmail.com" }
        })

        expect(input.value).toBe("test@gmail.com")
    })

    it("Should allow user to type phone number", () => {

        render(<Register />)

        const input = screen.getByTestId("phone")

        fireEvent.change(input, {
            target: { value: "99999999" }
        })

        expect(input.value).toBe("99999999")
    })

    it("Should allow user to type password", () => {

        render(<Register />)

        const input = screen.getByTestId("password")

        fireEvent.change(input, {
            target: { value: "123456" }
        })

        expect(input.value).toBe("123456")
    })

    it("Should allow user to type confirm password", () => {

        render(<Register />)

        const input = screen.getByTestId("confirm-password")

        fireEvent.change(input, {
            target: { value: "123456" }
        })

        expect(input.value).toBe("123456")
    })

})

//khadija