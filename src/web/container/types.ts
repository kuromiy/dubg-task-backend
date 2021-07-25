const TYPES = {
    // Vendor
    Ajv:               Symbol.for("Ajv"),
    PrismaClient:      Symbol.for("PrismaClient"),
    ApplicationLogger: Symbol.for("ApplicationLogger"),
    // Validate
    TaskRegisterValidate: Symbol.for("TaskRegisterValidate"),
    TaskSearchValidate:   Symbol.for("TaskSearchValidate"),
    // Repository
    UserRepository: Symbol.for("UserRepository"),
    TaskRepository: Symbol.for("TaskRepository"),
    // Usecase
    TaskRegisterUseCase: Symbol.for("TaskRegisterUseCase"),
    TaskSearchUseCase:   Symbol.for("TaskSearchUseCase"),
    // Service
    TaskRegisterService: Symbol.for("TaskRegisterService"),
    TaskSearchService:   Symbol.for("TaskSearchService"),
    // Controller
    TaskRegisterController: Symbol.for("TaskRegisterController"),
    TaskSearchController:   Symbol.for("TaskSearchController"),
};

export { TYPES };
