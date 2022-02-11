CREATE DATABASE  IF NOT EXISTS `demo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `demo`;
-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: demo
-- ------------------------------------------------------
-- Server version	5.7.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_article`
--

DROP TABLE IF EXISTS `t_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `cover` varchar(512) NOT NULL,
  `sketch` varchar(2048) NOT NULL COMMENT '简述',
  `content` text NOT NULL,
  `label_id` int(11) NOT NULL COMMENT '关联标签id',
  `status` int(11) NOT NULL,
  `description` varchar(2048) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `auth` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_article`
--

LOCK TABLES `t_article` WRITE;
/*!40000 ALTER TABLE `t_article` DISABLE KEYS */;
INSERT INTO `t_article` VALUES (1,'颜值与气质','/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg','天生丽质与后期装扮，二者谁更重要呢？','[{\"type\":1, \"content\":\"/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。\"},{\"type\":1, \"content\":\"https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2207321519795/O1CN012Nd6gv2MEABRWgWxN_!!0-item_pic.jpg_580x580Q90.jpg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。如果您与他人共用您的计算机，或者希望将您的工作浏览数据和个人浏览数据分隔开来，不妨尝试使用 Chrome 个人资料。 详细了解个人资料。  在右上角，点击“个人资料”图标 。 点击“添加”。\"}]',20,1,'这是备注','2022-02-11 11:44:19','王军'),(2,'这是文章标题','/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg','这是封面简述这是封面简述这是封面简述这是封面简述这是封面简述这是封面简述这是封面简述这是封面简述','[{\"type\":1, \"content\":\"/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。\"},{\"type\":1, \"content\":\"https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2207321519795/O1CN012Nd6gv2MEABRWgWxN_!!0-item_pic.jpg_580x580Q90.jpg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。如果您与他人共用您的计算机，或者希望将您的工作浏览数据和个人浏览数据分隔开来，不妨尝试使用 Chrome 个人资料。 详细了解个人资料。  在右上角，点击“个人资料”图标 。 点击“添加”。\"}]',7,1,'这是备注','2022-02-11 11:44:18','张良'),(3,'这是标题','/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg','这是封面简述','[{\"type\":1, \"content\":\"/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。\"},{\"type\":1, \"content\":\"https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2207321519795/O1CN012Nd6gv2MEABRWgWxN_!!0-item_pic.jpg_580x580Q90.jpg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。如果您与他人共用您的计算机，或者希望将您的工作浏览数据和个人浏览数据分隔开来，不妨尝试使用 Chrome 个人资料。 详细了解个人资料。  在右上角，点击“个人资料”图标 。 点击“添加”。\"}]',21,1,'这是备注','2022-02-11 11:44:17','亚瑟'),(4,'这是标题456','/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg','这是封面简述','[{\"type\":1, \"content\":\"/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。\"},{\"type\":1, \"content\":\"https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2207321519795/O1CN012Nd6gv2MEABRWgWxN_!!0-item_pic.jpg_580x580Q90.jpg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。如果您与他人共用您的计算机，或者希望将您的工作浏览数据和个人浏览数据分隔开来，不妨尝试使用 Chrome 个人资料。 详细了解个人资料。  在右上角，点击“个人资料”图标 。 点击“添加”。\"}]',20,1,'这是备注','2022-02-11 11:44:16','zengkefan'),(5,'这是标题345','/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg','这是封面简述','[{\"type\":1, \"content\":\"/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。\"},{\"type\":1, \"content\":\"https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2207321519795/O1CN012Nd6gv2MEABRWgWxN_!!0-item_pic.jpg_580x580Q90.jpg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。如果您与他人共用您的计算机，或者希望将您的工作浏览数据和个人浏览数据分隔开来，不妨尝试使用 Chrome 个人资料。 详细了解个人资料。  在右上角，点击“个人资料”图标 。 点击“添加”。\"}]',20,1,'这是备注','2022-02-10 17:25:28','zengkefan'),(6,'这是标题234','/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg','这是封面简述','[{\"type\":1, \"content\":\"/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。\"},{\"type\":1, \"content\":\"https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2207321519795/O1CN012Nd6gv2MEABRWgWxN_!!0-item_pic.jpg_580x580Q90.jpg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。如果您与他人共用您的计算机，或者希望将您的工作浏览数据和个人浏览数据分隔开来，不妨尝试使用 Chrome 个人资料。 详细了解个人资料。  在右上角，点击“个人资料”图标 。 点击“添加”。\"}]',20,1,'这是备注','2022-02-10 17:25:36','zengkefan'),(15,'这是标题','/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg','这是封面简述123','[{\"type\":1, \"content\":\"/fileUpload/2022-02-11/zengkefan__12__1644574928850.jpeg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。\"},{\"type\":1, \"content\":\"https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2207321519795/O1CN012Nd6gv2MEABRWgWxN_!!0-item_pic.jpg_580x580Q90.jpg\"}, {\"type\":2,\"content\":\"这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。这是内容。如果您与他人共用您的计算机，或者希望将您的工作浏览数据和个人浏览数据分隔开来，不妨尝试使用 Chrome 个人资料。 详细了解个人资料。  在右上角，点击“个人资料”图标 。 点击“添加”。\"}]',20,1,'这是备注test123','2022-02-11 18:22:11','无名');
/*!40000 ALTER TABLE `t_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_label`
--

DROP TABLE IF EXISTS `t_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `level` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `description` varchar(1500) DEFAULT NULL,
  `remark` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_label`
--

LOCK TABLES `t_label` WRITE;
/*!40000 ALTER TABLE `t_label` DISABLE KEYS */;
INSERT INTO `t_label` VALUES (4,'行业政策',1,0,'碳中和，节能减排术语，是指企业、团体或个人测算在一定时间内，直接或间接产生的温室气体排放总量，通过植树造林、节能减排等形式，抵消自身产生的二氧化碳排放，实现二氧化碳的“零排放”。','sssssssssss'),(7,'碳中和',2,4,'碳中和，节能减排术语，是指企业、团体或个人测算在一定时间内，直接或间接产生的温室气体排放总量，通过植树造林、节能减排等形式，抵消自身产生的二氧化碳排放，实现二氧化碳的“零排放”。','sssssssssss'),(19,'数字思维',1,0,'1',''),(20,'数字驱动思维',2,19,'数字驱动思维',''),(21,'资源盘点',1,0,'资源盘点',''),(22,'数字技术',1,0,'数字技术',''),(23,'管理实践',1,0,'管理实践',''),(24,'产品设计',2,21,'产品设计',''),(25,'数字孪生',2,22,'数字孪生',''),(26,'数字经济',2,4,'数字经济 ',''),(27,'新基建',2,4,'新基建',''),(28,'产品生命周期价值链',2,21,'产品生命周期价值链','');
/*!40000 ALTER TABLE `t_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_question`
--

DROP TABLE IF EXISTS `t_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(1024) NOT NULL DEFAULT '',
  `cover` varchar(255) NOT NULL,
  `options` varchar(2048) NOT NULL,
  `answer` varchar(50) NOT NULL COMMENT '简述',
  `origin` varchar(255) NOT NULL DEFAULT '',
  `label_id` int(11) NOT NULL COMMENT '关联标签id',
  `status` int(11) NOT NULL,
  `description` varchar(2048) DEFAULT NULL COMMENT '备注',
  `type` int(11) DEFAULT NULL COMMENT '1单选2多选3判断',
  `imageUrl` varchar(45) DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_question`
--

LOCK TABLES `t_question` WRITE;
/*!40000 ALTER TABLE `t_question` DISABLE KEYS */;
INSERT INTO `t_question` VALUES (7,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 15:06:04'),(8,'数字化转型具有全局统领协调统筹能力的核心技术是哪一个？','','人工智能||数字孪生||5G||云计算','B','《工业互联网数字孪生白皮书（2021）》：工业互联网产业联盟',25,1,'从数字化整体角度理解数字孪生技术的核心作用',1,'','2022-02-09 15:06:04'),(9,'下面哪些属于新基建的建设内容？','','工业互联网||5G||城市数据中心||特高压','ABCD','《2020年中国工业和信息化发展形势展望系列报告》：赛迪工业和信息化研究',27,1,'从数据，能源，交通等角度全面理解新基建的内涵',2,'','2022-02-09 15:06:04'),(10,'B2B和C2C的区别是什么？','','产品定位不同||研发过程不同||用户群体不同||业务形态不同','ACD','《B端产品设计与开发》：中国电力出版社',28,1,'用于评估被测评人对不同业务属性的认知与理解。属性不同决定了商业模式的不同，也决定了产品设计的差异',2,'','2022-02-09 15:06:04'),(11,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 15:11:36'),(12,'数字化转型具有全局统领协调统筹能力的核心技术是哪一个？','','人工智能||数字孪生||5G||云计算','B','《工业互联网数字孪生白皮书（2021）》：工业互联网产业联盟',25,1,'从数字化整体角度理解数字孪生技术的核心作用',1,'','2022-02-09 15:11:36'),(13,'下面哪些属于新基建的建设内容？','','工业互联网||5G||城市数据中心||特高压','ABCD','《2020年中国工业和信息化发展形势展望系列报告》：赛迪工业和信息化研究',27,1,'从数据，能源，交通等角度全面理解新基建的内涵',2,'','2022-02-09 15:11:36'),(14,'B2B和C2C的区别是什么？','','产品定位不同||研发过程不同||用户群体不同||业务形态不同','ACD','《B端产品设计与开发》：中国电力出版社',28,1,'用于评估被测评人对不同业务属性的认知与理解。属性不同决定了商业模式的不同，也决定了产品设计的差异',2,'','2022-02-09 15:11:36'),(15,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 15:13:36'),(16,'数字化转型具有全局统领协调统筹能力的核心技术是哪一个？','','人工智能||数字孪生||5G||云计算','B','《工业互联网数字孪生白皮书（2021）》：工业互联网产业联盟',25,1,'从数字化整体角度理解数字孪生技术的核心作用',1,'','2022-02-09 15:13:36'),(17,'下面哪些属于新基建的建设内容？','','工业互联网||5G||城市数据中心||特高压','ABCD','《2020年中国工业和信息化发展形势展望系列报告》：赛迪工业和信息化研究',27,1,'从数据，能源，交通等角度全面理解新基建的内涵',2,'','2022-02-09 15:13:36'),(18,'B2B和C2C的区别是什么？','','产品定位不同||研发过程不同||用户群体不同||业务形态不同','ACD','《B端产品设计与开发》：中国电力出版社',28,1,'用于评估被测评人对不同业务属性的认知与理解。属性不同决定了商业模式的不同，也决定了产品设计的差异',2,'','2022-02-09 15:13:36'),(19,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 15:18:21'),(20,'数字化转型具有全局统领协调统筹能力的核心技术是哪一个？','','人工智能||数字孪生||5G||云计算','B','《工业互联网数字孪生白皮书（2021）》：工业互联网产业联盟',25,1,'从数字化整体角度理解数字孪生技术的核心作用',1,'','2022-02-09 15:18:21'),(21,'下面哪些属于新基建的建设内容？','','工业互联网||5G||城市数据中心||特高压','ABCD','《2020年中国工业和信息化发展形势展望系列报告》：赛迪工业和信息化研究',27,1,'从数据，能源，交通等角度全面理解新基建的内涵',2,'','2022-02-09 15:18:21'),(22,'B2B和C2C的区别是什么？','','产品定位不同||研发过程不同||用户群体不同||业务形态不同','ACD','《B端产品设计与开发》：中国电力出版社',28,1,'用于评估被测评人对不同业务属性的认知与理解。属性不同决定了商业模式的不同，也决定了产品设计的差异',2,'','2022-02-09 15:18:21'),(23,'ToC产品与ToB产品规划与运营策略完全一致。','','T||F','F','产品经理<需求分析与理解>：腾讯产品经理衡量纬度',24,2,'明辨分析TOC和TOB两种产品的策略区别',3,'','2022-02-09 15:21:57'),(24,'数字化转型具有全局统领协调统筹能力的核心技术是哪一个？','','人工智能||数字孪生||5G||云计算','B','《工业互联网数字孪生白皮书（2021）》：工业互联网产业联盟',25,1,'从数字化整体角度理解数字孪生技术的核心作用',1,'','2022-02-09 15:21:57'),(25,'数字化转型能给企业带来哪些价值？','','生产运营优化||产品服务创新||业态模式创新||企业更少投资','ABC','《数字化转型百问》：清华大学出版社',26,1,'从效率，质量，平台三个角度加深测评人对于数字化转型的理解，这里企业将少投资不是数字化转型的核心价值',2,'','2022-02-09 15:21:57'),(26,'下面哪些属于新基建的建设内容？','','工业互联网||5G||城市数据中心||特高压','ABCD','《2020年中国工业和信息化发展形势展望系列报告》：赛迪工业和信息化研究',27,1,'从数据，能源，交通等角度全面理解新基建的内涵',2,'','2022-02-09 15:21:57'),(27,'B2B和C2C的区别是什么？','','产品定位不同||研发过程不同||用户群体不同||业务形态不同','ACD','《B端产品设计与开发》：中国电力出版社',28,1,'用于评估被测评人对不同业务属性的认知与理解。属性不同决定了商业模式的不同，也决定了产品设计的差异',2,'','2022-02-09 15:21:57'),(28,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 15:22:51'),(29,'ToC产品与ToB产品规划与运营策略完全一致。','','T||F','F','产品经理<需求分析与理解>：腾讯产品经理衡量纬度',24,2,'明辨分析TOC和TOB两种产品的策略区别',3,'','2022-02-09 15:22:51'),(30,'数字化转型具有全局统领协调统筹能力的核心技术是哪一个？','','人工智能||数字孪生||5G||云计算','B','《工业互联网数字孪生白皮书（2021）》：工业互联网产业联盟',25,1,'从数字化整体角度理解数字孪生技术的核心作用',1,'','2022-02-09 15:22:51'),(31,'数字时代代表着根本性的社会经济和行为转变。每个组织对“数字时代”的看法各有不同，关于数字化转型，所有组织都需要考虑什么？','','敏捷和精益实践如何用于应对商业化社会||自带设备(BYOD)如何可以降低总拥有成本(TCO)||组织如何需要理解和利用知识和数据||互联网的发展如何影响存储数据的安全性','C','《数字化转型与创新管理-VeriSM揭秘与应用》：清华大学出版社',20,1,'数字化转型是一个不断变化的过程，不能只考虑特定实践，特定技术，特定管理方法',1,'','2022-02-09 15:22:51'),(32,'数字化转型能给企业带来哪些价值？','','生产运营优化||产品服务创新||业态模式创新||企业更少投资','ABC','《数字化转型百问》：清华大学出版社',26,1,'从效率，质量，平台三个角度加深测评人对于数字化转型的理解，这里企业将少投资不是数字化转型的核心价值',2,'','2022-02-09 15:22:51'),(33,'下面哪些属于新基建的建设内容？','','工业互联网||5G||城市数据中心||特高压','ABCD','《2020年中国工业和信息化发展形势展望系列报告》：赛迪工业和信息化研究',27,1,'从数据，能源，交通等角度全面理解新基建的内涵',2,'','2022-02-09 15:22:51'),(34,'B2B和C2C的区别是什么？','','产品定位不同||研发过程不同||用户群体不同||业务形态不同','ACD','《B端产品设计与开发》：中国电力出版社',28,1,'用于评估被测评人对不同业务属性的认知与理解。属性不同决定了商业模式的不同，也决定了产品设计的差异',2,'','2022-02-09 15:22:51'),(35,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 15:23:21'),(36,'ToC产品与ToB产品规划与运营策略完全一致。','','T||F','F','产品经理<需求分析与理解>：腾讯产品经理衡量纬度',24,2,'明辨分析TOC和TOB两种产品的策略区别',3,'','2022-02-09 15:23:21'),(37,'数字化转型具有全局统领协调统筹能力的核心技术是哪一个？','','人工智能||数字孪生||5G||云计算','B','《工业互联网数字孪生白皮书（2021）》：工业互联网产业联盟',25,1,'从数字化整体角度理解数字孪生技术的核心作用',1,'','2022-02-09 15:23:21'),(38,'数字时代代表着根本性的社会经济和行为转变。每个组织对“数字时代”的看法各有不同，关于数字化转型，所有组织都需要考虑什么？','','敏捷和精益实践如何用于应对商业化社会||自带设备(BYOD)如何可以降低总拥有成本(TCO)||组织如何需要理解和利用知识和数据||互联网的发展如何影响存储数据的安全性','C','《数字化转型与创新管理-VeriSM揭秘与应用》：清华大学出版社',20,1,'数字化转型是一个不断变化的过程，不能只考虑特定实践，特定技术，特定管理方法',1,'','2022-02-09 15:23:21'),(39,'数字化转型能给企业带来哪些价值？','','生产运营优化||产品服务创新||业态模式创新||企业更少投资','ABC','《数字化转型百问》：清华大学出版社',26,1,'从效率，质量，平台三个角度加深测评人对于数字化转型的理解，这里企业将少投资不是数字化转型的核心价值',2,'','2022-02-09 15:23:21'),(40,'下面哪些属于新基建的建设内容？','','工业互联网||5G||城市数据中心||特高压','ABCD','《2020年中国工业和信息化发展形势展望系列报告》：赛迪工业和信息化研究',27,1,'从数据，能源，交通等角度全面理解新基建的内涵',2,'','2022-02-09 15:23:21'),(41,'B2B和C2C的区别是什么？','','产品定位不同||研发过程不同||用户群体不同||业务形态不同','ACD','《B端产品设计与开发》：中国电力出版社',28,1,'用于评估被测评人对不同业务属性的认知与理解。属性不同决定了商业模式的不同，也决定了产品设计的差异',2,'','2022-02-09 15:23:21'),(42,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 16:46:29'),(43,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 16:57:55'),(44,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:00:21'),(45,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:01:23'),(46,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:03:01'),(47,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:04:00'),(48,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:08:19'),(49,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:10:31'),(50,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:13:04'),(51,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:14:26'),(52,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:17:35'),(53,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:22:06'),(54,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:22:27'),(55,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:23:38'),(56,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-09 17:31:38'),(57,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-10 10:32:34'),(58,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-10 16:16:12'),(59,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-10 16:26:07'),(60,'数据不仅可以直接转化为现实生产力，也能够放大其他生产要素的潜力，优化要素投入结构，驱动数字化转型、实现全要素生产率提升。','','T||F','T','《数字化转型百问》：清华大学出版社',20,1,'用户了解并加深被测评人对于数据驱动思维的认知',3,'','2022-02-10 16:26:49');
/*!40000 ALTER TABLE `t_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_rel_article_label`
--

DROP TABLE IF EXISTS `t_rel_article_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_rel_article_label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_rel_article_label`
--

LOCK TABLES `t_rel_article_label` WRITE;
/*!40000 ALTER TABLE `t_rel_article_label` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_rel_article_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_rel_question_label`
--

DROP TABLE IF EXISTS `t_rel_question_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_rel_question_label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_rel_question_label`
--

LOCK TABLES `t_rel_question_label` WRITE;
/*!40000 ALTER TABLE `t_rel_question_label` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_rel_question_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) DEFAULT NULL,
  `isdelete` int(11) NOT NULL DEFAULT '0',
  `role` int(11) DEFAULT '3',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (12,'zengkefan','zengkefan','wtY2KwmMgPO+8a3mtptqBw==','18664397582','','sLkv','2022-01-31 18:52:09','2022-01-31 18:52:09','',0,1);
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_wechat_user`
--

DROP TABLE IF EXISTS `t_wechat_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wechat_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) DEFAULT NULL,
  `isdelete` int(11) NOT NULL DEFAULT '0',
  `role` int(11) DEFAULT '3',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_wechat_user`
--

LOCK TABLES `t_wechat_user` WRITE;
/*!40000 ALTER TABLE `t_wechat_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_wechat_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11 18:30:51
