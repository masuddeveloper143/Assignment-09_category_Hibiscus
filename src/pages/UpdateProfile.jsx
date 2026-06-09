import React, { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const UpdateProfile = () => {

  const { updateUserProfile } = useContext(AuthContext);

  useEffect(() => {
    document.title = "JobTrack | Profile";
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const photoURL = form.photoURL.value;

    try {
      await updateUserProfile(name, photoURL);

      toast.success("✅ Profile Updated Successfully");

      form.reset();

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">

        <div className="card-body">

          <h1 className="text-4xl font-bold text-center text-primary">
            Update Profile
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Update your profile information
          </p>

          <form
            onSubmit={handleUpdateProfile}
            className="space-y-5"
          >

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Full Name
                </span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Photo URL
                </span>
              </label>

              <input
                type="text"
                name="photoURL"
                placeholder="Enter photo URL"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Update Information
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default UpdateProfile;