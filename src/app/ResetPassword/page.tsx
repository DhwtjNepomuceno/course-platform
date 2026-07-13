"use client"

import Input from "@/components/Input"
import Button from "@/components/Button"

export default function ResetPassword() {

    return (
        <div className="grid place-items-center mt-12">
            <h1 className="text-title-t">Reseting your password</h1>


            <div className="min-w-screen min-h-screen bg-surface-c rounded-2xl mt-3 justify-items-center">
                <form>
                    <Input label="Enter you new password" id="newPassword" type="password" placeholder="Password" />
                    <Input label="Reenter your new password" id="passwordConfirm" type="password" placeholder="Password" />
                </form>
                <div>
                    <Button type="submit">Update password</Button>
                </div>
                
            </div>
        </div>

    )
}