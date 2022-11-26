variable "network_interface_id" {
  type = string
  default = "eni-0efe8bdb1520ef82c"
}

variable "ami" {
    type = string
    default = "ami-068a09dfe4f11cc6a"
}

variable "instance_type" {
    type = string
    default = "t2.micro"
}
// Used this resource: https://www.techtarget.com/searchcloudcomputing/tip/How-to-launch-an-EC2-instance-using-Terraform