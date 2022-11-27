variable "network_interface_id" {
  type = string
  default = "eni-0568f30f0680ac067"
}

variable "ami" {
    type = string
    default = "ami-0f5e8a042c8bfcd5e"
}

variable "instance_type" {
    type = string
    default = "t2.micro"
}