import type { Locale } from "@/i18n/config";

/**
 * Tin tuyển dụng của trang /careers. Thêm vị trí: thêm một phần tử vào `jobs` (đủ hai ngôn ngữ).
 * Đóng vị trí: xoá phần tử — trang chi tiết thành 404, danh sách và sitemap tự cập nhật.
 *
 * Nhãn dùng chung (Thông tin chung, Quyền lợi…) nằm trong từ điển, namespace `careers`.
 * Chuỗi hỗ trợ **chữ đậm** như các đoạn RichText khác.
 */
export interface JobContent {
  /** Tên vị trí ở tiêu đề trang và thẻ danh sách. */
  title: string;
  /** Giá trị dòng "Vị trí" trong Thông tin chung. */
  position: string;
  /** Một câu cho thẻ danh sách và meta description. */
  summary: string;
  intro: string;
  location: string;
  audience: string;
  schedule: string;
  path: string;
  responsibilitiesIntro?: string;
  responsibilities: string[];
  training: string;
  requirements: string[];
  niceToHave: string[];
  note: string;
  benefits: string[];
  applyHint: string;
}

export interface Job {
  /** Đoạn URL: /careers/<slug>. */
  slug: string;
  /** Mã ở tiêu đề email ứng tuyển: `[<applyTag>] - Họ và tên`. Giống nhau ở mọi ngôn ngữ. */
  applyTag: string;
  /** Ngày đăng (YYYY-MM-DD) — vào `datePosted` của dữ liệu JobPosting cho Google. */
  postedAt: string;
  openings: number;
  /** Hỗ trợ thực tập mỗi tháng, đơn vị VND. */
  monthlyAllowance: number;
  content: Record<Locale, JobContent>;
}

export const jobs: Job[] = [
  {
    slug: "intern-qc",
    applyTag: "Intern QC",
    postedAt: "2026-10-19",
    openings: 1,
    monthlyAllowance: 1_500_000,
    content: {
      vi: {
        title: "Intern QC (Software Tester)",
        position: "Intern QC / Software Tester",
        summary:
          "Được đào tạo bài bản về kiểm thử phần mềm và tham gia trực tiếp các dự án product phục vụ thị trường Việt Nam.",
        intro:
          "**Softrent** đang tìm kiếm các bạn Intern QC có tinh thần học hỏi, tư duy logic và mong muốn phát triển sự nghiệp trong lĩnh vực kiểm thử phần mềm. Bạn sẽ được đào tạo theo lộ trình cụ thể và tham gia trực tiếp vào các dự án product phục vụ thị trường Việt Nam.",
        location: "Đà Nẵng",
        audience:
          "Sinh viên năm 3, năm 4 hoặc mới tốt nghiệp các ngành CNTT, Hệ thống thông tin và các ngành liên quan.",
        schedule: "Lên công ty tối thiểu 15 ngày/tháng.",
        path: "Đào tạo 3–6 tháng → Đánh giá năng lực → Thử việc → Nhân viên chính thức (theo kết quả đánh giá và nhu cầu tuyển dụng).",
        responsibilitiesIntro:
          "Trong quá trình thực tập, bạn sẽ được hướng dẫn và tham gia các công việc kiểm thử phần mềm:",
        responsibilities: [
          "Tìm hiểu yêu cầu nghiệp vụ và phân tích chức năng của sản phẩm.",
          "Xây dựng Test Case, Checklist và Test Scenario theo hướng dẫn.",
          "Thực hiện kiểm thử thủ công (Manual Testing) trên website và các hệ thống phần mềm.",
          "Phát hiện, ghi nhận và báo cáo lỗi; theo dõi quá trình xử lý và kiểm tra lại sau khi sửa lỗi.",
          "Thực hiện Regression Testing để đảm bảo các chức năng hiện có hoạt động ổn định sau mỗi lần cập nhật.",
          "Phối hợp với Developer, BA và các thành viên trong nhóm để làm rõ yêu cầu và đảm bảo chất lượng sản phẩm.",
          "Từng bước tiếp cận các kỹ thuật kiểm thử nâng cao theo lộ trình đào tạo.",
        ],
        training:
          "Được đào tạo theo lộ trình từ 3–6 tháng, từ kiến thức nền tảng đến thực hành kiểm thử trên các dự án thực tế. Sau quá trình đào tạo, ứng viên sẽ được đánh giá năng lực để xem xét chuyển sang giai đoạn thử việc và hướng tới vị trí QC chính thức.",
        requirements: [
          "Là sinh viên năm 3, năm 4 hoặc mới tốt nghiệp các ngành CNTT, Hệ thống thông tin hoặc ngành liên quan.",
          "Có tư duy logic, khả năng quan sát và chú ý đến chi tiết.",
          "Có tinh thần trách nhiệm, chủ động học hỏi và sẵn sàng tiếp nhận phản hồi.",
          "Có khả năng đọc hiểu yêu cầu, diễn đạt vấn đề rõ ràng và làm việc nhóm.",
          "Có thể lên công ty làm việc tối thiểu 15 ngày/tháng.",
          "Có định hướng gắn bó lâu dài, nghiêm túc theo đuổi lĩnh vực kiểm thử phần mềm sau thời gian thực tập.",
        ],
        niceToHave: [
          "Đã tìm hiểu về Software Testing hoặc từng thực hành kiểm thử website.",
          "Có kiến thức cơ bản về quy trình phát triển phần mềm.",
          "Có khả năng đọc hiểu tài liệu tiếng Anh chuyên ngành.",
        ],
        note: "Chưa có kinh nghiệm thực tế không phải là trở ngại. Softrent ưu tiên tinh thần học hỏi, tư duy logic, sự chủ động và cam kết phát triển lâu dài của ứng viên.",
        benefits: [
          "Được đào tạo theo lộ trình từ kiến thức nền tảng đến thực hành kiểm thử dự án.",
          "Có người hướng dẫn và nhận phản hồi trong quá trình học tập, làm việc.",
          "Được tiếp cận các dự án product Việt Nam và quy trình phát triển phần mềm thực tế.",
          "Được đánh giá năng lực định kỳ để xác định hướng phát triển tiếp theo.",
          "Cơ hội chuyển sang thử việc và trở thành nhân viên chính thức nếu đáp ứng yêu cầu.",
          "Môi trường startup công nghệ năng động, khuyến khích học hỏi, chủ động và phát triển lâu dài cùng công ty.",
        ],
        applyHint:
          "Nếu chưa có kinh nghiệm, bạn có thể bổ sung các dự án học tập, bài tập thực hành kiểm thử hoặc những kiến thức đã tự học vào CV.",
      },
      en: {
        title: "QC Intern (Software Tester)",
        position: "QC Intern / Software Tester",
        summary:
          "Get structured training in software testing and work directly on product projects built for the Vietnamese market.",
        intro:
          "**Softrent** is looking for QC interns who are eager to learn, think logically and want to build a career in software testing. You will follow a clear training path and work directly on product projects serving the Vietnamese market.",
        location: "Da Nang",
        audience: "Third- or fourth-year students or recent graduates in IT, Information Systems or related fields.",
        schedule: "At least 15 days a month at the office.",
        path: "3–6 months of training → Skills assessment → Probation → Full-time employee (based on assessment results and hiring needs).",
        responsibilitiesIntro: "During the internship, you will be guided through and take part in software testing work:",
        responsibilities: [
          "Learn the business requirements and analyse the product's features.",
          "Write test cases, checklists and test scenarios under guidance.",
          "Perform manual testing on websites and software systems.",
          "Find, log and report bugs; follow up on fixes and re-test once they are resolved.",
          "Run regression tests to keep existing features stable after every update.",
          "Work with developers, BAs and other team members to clarify requirements and ensure product quality.",
          "Gradually pick up advanced testing techniques along the training path.",
        ],
        training:
          "You will be trained over 3–6 months, from the fundamentals to hands-on testing on real projects. After the training, your skills will be assessed to decide on moving to probation and towards a full-time QC role.",
        requirements: [
          "Third- or fourth-year student or recent graduate in IT, Information Systems or a related field.",
          "Logical thinking, good observation and attention to detail.",
          "Responsible, proactive in learning and open to feedback.",
          "Able to understand requirements, explain issues clearly and work in a team.",
          "Able to work at the office at least 15 days a month.",
          "Looking for a long-term path and serious about a career in software testing after the internship.",
        ],
        niceToHave: [
          "Have studied software testing or practised testing websites.",
          "Basic knowledge of the software development process.",
          "Able to read technical documents in English.",
        ],
        note: "No hands-on experience yet? That is not a barrier. Softrent values a learning mindset, logical thinking, initiative and a long-term commitment to growth.",
        benefits: [
          "Structured training from the fundamentals to hands-on project testing.",
          "A mentor and regular feedback while you learn and work.",
          "Exposure to Vietnamese product projects and a real software development process.",
          "Regular skills assessments to plan your next steps.",
          "A chance to move to probation and become a full-time employee if you meet the requirements.",
          "A dynamic tech startup that encourages learning, initiative and long-term growth with the company.",
        ],
        applyHint:
          "No experience yet? Add your study projects, testing exercises or what you have taught yourself to your CV.",
      },
    },
  },
  {
    slug: "intern-ba",
    applyTag: "Intern BA",
    postedAt: "2026-10-19",
    openings: 1,
    monthlyAllowance: 1_500_000,
    content: {
      vi: {
        title: "Intern BA (Business Analyst)",
        position: "Intern BA / Business Analyst",
        summary:
          "Được đào tạo về phân tích nghiệp vụ phần mềm và tham gia trực tiếp các dự án product phục vụ thị trường Việt Nam.",
        intro:
          "**Softrent** đang tìm kiếm các bạn Intern BA có tư duy logic, khả năng phân tích và mong muốn phát triển sự nghiệp trong lĩnh vực phân tích nghiệp vụ phần mềm. Bạn sẽ được đào tạo theo lộ trình cụ thể và tham gia trực tiếp vào các dự án product phục vụ thị trường Việt Nam.",
        location: "Đà Nẵng",
        audience:
          "Sinh viên năm 3, năm 4 hoặc mới tốt nghiệp các ngành CNTT, Hệ thống thông tin, Quản trị kinh doanh và các ngành liên quan.",
        schedule: "Lên công ty tối thiểu 15 ngày/tháng.",
        path: "Đào tạo 3–6 tháng → Đánh giá năng lực → Thử việc → Nhân viên chính thức (theo kết quả đánh giá và nhu cầu tuyển dụng).",
        responsibilities: [
          "Tìm hiểu sản phẩm, nhu cầu người dùng và quy trình nghiệp vụ của dự án.",
          "Phân tích yêu cầu nghiệp vụ, xác định các chức năng và luồng xử lý của hệ thống.",
          "Hỗ trợ xây dựng Use Case, Activity Diagram, User Flow và ERD ở mức cơ bản.",
          "Tham gia viết tài liệu đặc tả yêu cầu phần mềm (SRS), User Story và Acceptance Criteria theo hướng dẫn.",
          "Phối hợp với Developer và QC để làm rõ yêu cầu, giải đáp các vấn đề nghiệp vụ và xác nhận chức năng.",
          "Hỗ trợ kiểm tra sản phẩm, đối chiếu kết quả triển khai với yêu cầu đã thống nhất.",
          "Cập nhật tài liệu khi có thay đổi và tham gia các hoạt động review, cải tiến sản phẩm.",
        ],
        training:
          "Được đào tạo theo lộ trình từ 3–6 tháng, từ kiến thức nền tảng về phân tích nghiệp vụ đến thực hành trên các dự án thực tế. Sau quá trình đào tạo, ứng viên sẽ được đánh giá năng lực để xem xét chuyển sang giai đoạn thử việc và hướng tới vị trí BA chính thức.",
        requirements: [
          "Là sinh viên năm 3, năm 4 hoặc mới tốt nghiệp các ngành CNTT, Hệ thống thông tin, Quản trị kinh doanh hoặc các ngành liên quan.",
          "Có tư duy logic, khả năng phân tích và giải quyết vấn đề.",
          "Có kiến thức cơ bản hoặc mong muốn tìm hiểu về phân tích yêu cầu nghiệp vụ và quy trình phát triển phần mềm.",
          "Có khả năng trình bày ý tưởng, giao tiếp rõ ràng và làm việc nhóm.",
          "Cẩn thận, có trách nhiệm, chủ động học hỏi và sẵn sàng tiếp nhận phản hồi.",
          "Có thể lên công ty làm việc tối thiểu 15 ngày/tháng.",
          "Có định hướng gắn bó lâu dài và nghiêm túc phát triển sự nghiệp trong lĩnh vực Business Analysis.",
        ],
        niceToHave: [
          "Biết sử dụng Figma để xây dựng wireframe, prototype hoặc mô tả luồng người dùng.",
          "Đã tìm hiểu hoặc thực hành vẽ Use Case, Activity Diagram, ERD bằng Draw.io, Lucidchart hoặc công cụ tương đương.",
          "Có kiến thức cơ bản về SQL, cơ sở dữ liệu quan hệ và API.",
          "Có sản phẩm, tài liệu phân tích nghiệp vụ hoặc dự án học tập từng tham gia là một lợi thế.",
        ],
        note: "Không yêu cầu ứng viên thành thạo tất cả các công cụ khi ứng tuyển. Softrent ưu tiên tư duy phân tích, tinh thần học hỏi, sự chủ động và định hướng phát triển lâu dài.",
        benefits: [
          "Được đào tạo theo lộ trình từ kiến thức nền tảng đến thực hành phân tích nghiệp vụ dự án.",
          "Có người hướng dẫn và nhận phản hồi trong quá trình học tập, làm việc.",
          "Được tiếp cận các dự án product Việt Nam, quy trình nghiệp vụ và hoạt động phát triển sản phẩm thực tế.",
          "Có cơ hội phối hợp trực tiếp với Developer, QC và các thành viên trong nhóm dự án.",
          "Được đánh giá năng lực định kỳ để xác định hướng phát triển tiếp theo.",
          "Cơ hội chuyển sang thử việc và trở thành nhân viên chính thức nếu đáp ứng yêu cầu.",
          "Môi trường startup công nghệ năng động, khuyến khích học hỏi, chủ động và phát triển lâu dài cùng công ty.",
        ],
        applyHint:
          "Nếu chưa có kinh nghiệm, bạn có thể bổ sung các dự án học tập, bài tập phân tích nghiệp vụ, tài liệu mô tả chức năng hoặc sản phẩm đã từng tham gia xây dựng vào CV.",
      },
      en: {
        title: "BA Intern (Business Analyst)",
        position: "BA Intern / Business Analyst",
        summary:
          "Get trained in software business analysis and work directly on product projects built for the Vietnamese market.",
        intro:
          "**Softrent** is looking for BA interns with logical thinking, strong analytical skills and the drive to build a career in software business analysis. You will follow a clear training path and work directly on product projects serving the Vietnamese market.",
        location: "Da Nang",
        audience:
          "Third- or fourth-year students or recent graduates in IT, Information Systems, Business Administration or related fields.",
        schedule: "At least 15 days a month at the office.",
        path: "3–6 months of training → Skills assessment → Probation → Full-time employee (based on assessment results and hiring needs).",
        responsibilities: [
          "Learn about the product, user needs and the project's business processes.",
          "Analyse business requirements and define the system's features and flows.",
          "Help build use cases, activity diagrams, user flows and ERDs at a basic level.",
          "Help write software requirements specifications (SRS), user stories and acceptance criteria under guidance.",
          "Work with developers and QC to clarify requirements, answer business questions and confirm features.",
          "Help check the product and compare what was built against the agreed requirements.",
          "Keep documents up to date as things change, and take part in reviews and product improvements.",
        ],
        training:
          "You will be trained over 3–6 months, from the fundamentals of business analysis to hands-on work on real projects. After the training, your skills will be assessed to decide on moving to probation and towards a full-time BA role.",
        requirements: [
          "Third- or fourth-year student or recent graduate in IT, Information Systems, Business Administration or a related field.",
          "Logical thinking, analytical and problem-solving skills.",
          "Basic knowledge of, or a wish to learn about, business requirements analysis and the software development process.",
          "Able to present ideas, communicate clearly and work in a team.",
          "Careful, responsible, proactive in learning and open to feedback.",
          "Able to work at the office at least 15 days a month.",
          "Looking for a long-term path and serious about a career in business analysis.",
        ],
        niceToHave: [
          "Can use Figma to build wireframes or prototypes, or to describe user flows.",
          "Have learned or practised drawing use cases, activity diagrams and ERDs with Draw.io, Lucidchart or similar tools.",
          "Basic knowledge of SQL, relational databases and APIs.",
          "Products, business analysis documents or study projects you have worked on are a plus.",
        ],
        note: "You do not need to master every tool to apply. Softrent values analytical thinking, a learning mindset, initiative and long-term growth.",
        benefits: [
          "Structured training from the fundamentals to hands-on business analysis on projects.",
          "A mentor and regular feedback while you learn and work.",
          "Exposure to Vietnamese product projects, real business processes and product development.",
          "Work directly with developers, QC and other project team members.",
          "Regular skills assessments to plan your next steps.",
          "A chance to move to probation and become a full-time employee if you meet the requirements.",
          "A dynamic tech startup that encourages learning, initiative and long-term growth with the company.",
        ],
        applyHint:
          "No experience yet? Add your study projects, business analysis exercises, feature specifications or products you have helped build to your CV.",
      },
    },
  },
];

export function findJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
