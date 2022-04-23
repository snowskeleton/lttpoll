// Provider configuration

terraform {

  required_providers {

    aws = {

      source = "hashicorp/aws"

      version = "~> 3.0"

    }

  }

}

provider "aws" {

  region = "us-east-1"

}


resource "aws_iam_role" "lambda_role" {
  name               = "LambdaRole"
  assume_role_policy = <<EOF
{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    }
EOF
}

resource "aws_iam_role_policy" "lambda_role_policy" {
  name   = "LambdaRolePolicy"
  role   = "${aws_iam_role.lambda_role.id}"
  policy = <<EOF
{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
      ]
    }
    EOF
}

data "archive_file" "lambda_archive_getPoll" {
  type        = "zip"
  source_file = "${path.module}/lambda/getPoll.js"
  output_path = "${path.module}/lambda/getPoll.zip"
}

resource "aws_lambda_function" "lambda_getPoll" {
  filename         = "${path.module}/lambda/getPoll.zip"
  function_name    = "getPoll"
  role             = "${aws_iam_role.lambda_role.arn}"
  handler          = "getPoll.handler"
  source_code_hash = "${data.archive_file.lambda_archive_getPoll.output_base64sha256}"
  architectures    = [ "arm64" ]
  runtime          = "nodejs14.x"
}

data "archive_file" "lambda_archive_getVotes" {
  type        = "zip"
  source_file = "${path.module}/lambda/getVotes.js"
  output_path = "${path.module}/lambda/getVotes.zip"
}

resource "aws_lambda_function" "lambda_getVotes" {
  filename         = "${path.module}/lambda/getVotes.zip"
  function_name    = "getVotes"
  role             = "${aws_iam_role.lambda_role.arn}"
  handler          = "getVotes.handler"
  source_code_hash = "${data.archive_file.lambda_archive_getVotes.output_base64sha256}"
  architectures    = [ "arm64" ]
  runtime          = "nodejs14.x"
}

data "archive_file" "lambda_archive_createPoll" {
  type        = "zip"
  source_file = "${path.module}/lambda/createPoll.js"
  output_path = "${path.module}/lambda/createPoll.zip"
}

resource "aws_lambda_function" "lambda_createPoll" {
  filename         = "${path.module}/lambda/createPoll.zip"
  function_name    = "createPoll"
  role             = "${aws_iam_role.lambda_role.arn}"
  handler          = "createPoll.handler"
  source_code_hash = "${data.archive_file.lambda_archive_createPoll.output_base64sha256}"
  architectures    = [ "arm64" ]
  runtime          = "nodejs14.x"
}


data "archive_file" "lambda_archive_voteForPoll" {
  type        = "zip"
  source_file = "${path.module}/lambda/voteForPoll.js"
  output_path = "${path.module}/lambda/voteForPoll.zip"
}

resource "aws_lambda_function" "lambda_voteForPoll" {
  filename         = "${path.module}/lambda/voteForPoll.zip"
  function_name    = "voteForPoll"
  role             = "${aws_iam_role.lambda_role.arn}"
  handler          = "voteForPoll.handler"
  source_code_hash = "${data.archive_file.lambda_archive_voteForPoll.output_base64sha256}"
  architectures    = [ "arm64" ]
  runtime          = "nodejs14.x"
}
