import Login from "../comps/Login"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"

describe("Login Form Testing", () => {

    it("Should render login form title", () => {

        render(<Login />)

        const title = screen.getByText("Login Form")

        expect(title).toBeInTheDocument()
    })

    it("Should allow user to type email", () => {

        render(<Login />)

        const emailInput = screen.getByTestId("login-email")

        fireEvent.change(emailInput, {
            target: { value: "admin@gmail.com" }
        })

        expect(emailInput.value).toBe("admin@gmail.com")
    })

    it("Should allow user to type password", () => {

        render(<Login />)

        const passwordInput = screen.getByTestId("login-password")

        fireEvent.change(passwordInput, {
            target: { value: "123456" }
        })

        expect(passwordInput.value).toBe("123456")
    })

})

//khad