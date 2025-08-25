import strawberry
import os
from google.cloud import storage
from strawberry.file_uploads import Upload

# Initialize Google Cloud Storage client
storage_client = storage.Client()

# Define the input type for our mutation
@strawberry.input
class FileUploadInput:
    filename: str
    file_content: Upload

# Define the output type for our mutation
@strawberry.type
class UploadFileResponse:
    success: bool
    message: str
    file_path: str | None = None

# Define the mutation to upload a file
# We will upload the file to a GCS bucket
@strawberry.type
class Mutation:
    @strawberry.mutation
    async def upload_sales_data(self, file_input: FileUploadInput) -> UploadFileResponse:
        """
        Uploads a sales data file to Google Cloud Storage.
        """
        try:
            # Get the bucket name from an environment variable for security
            bucket_name = os.environ.get("GCS_BUCKET_NAME")
            if not bucket_name:
                raise ValueError("GCS_BUCKET_NAME environment variable is not set.")

            bucket = storage_client.bucket(bucket_name)

            # Define the path where the file will be stored in the bucket
            # We use the user's ID to isolate their data
            # We will need to get the user ID from the JWT token
            # For now, we use a placeholder user_id
            user_id = "placeholder_user_id"
            file_path = f"user_uploads/{user_id}/{file_input.filename}"

            blob = bucket.blob(file_path)

            # Upload the file content
            blob.upload_from_file(file_input.file_content, content_type="text/csv")

            # The file is now in GCS. We can add more logic here later
            # For example, we could trigger an Airflow DAG.

            return UploadFileResponse(
                success=True,
                message="File uploaded successfully.",
                file_path=file_path
            )
        except Exception as e:
            return UploadFileResponse(
                success=False,
                message=f"An error occurred: {str(e)}"
            )

# Define the main GraphQL schema
@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Hello, this is your GraphQL API!"

schema = strawberry.Schema(query=Query, mutation=Mutation)