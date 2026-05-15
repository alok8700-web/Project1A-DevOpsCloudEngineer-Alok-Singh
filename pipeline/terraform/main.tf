resource "aws_instance" "app" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}
